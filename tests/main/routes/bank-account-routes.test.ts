import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Collection, ObjectId } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

let bankAccountCollection: Collection
let accountCollection: Collection
let bankCollection: Collection
let accountId: string
let bankId: string
let accessToken: string

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoHelper.connect(uri)

  // Creates the user account to authenticate
  accountCollection = await mongoHelper.getCollection('accounts')
  const hashed_password = await hash('any_password', 12)
  const mongoAccount = await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
  accountId = mongoAccount.insertedId.toHexString()
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: mongoAccount.insertedId }, { $set: { accessToken } })

  // Creates the bank to use in the requests
  bankCollection = await mongoHelper.getCollection('banks')
  const mongoBank = await bankCollection.insertOne({
    name: 'any_bank',
    flags: ['any_flag']
  })
  bankId = mongoBank.insertedId.toHexString()

})

beforeEach(async () => {
  bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
  bankAccountCollection.deleteMany()
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: new ObjectId(accountId) }, { $set: { accessToken } })
})

describe('POST /bank-accounts', () => {

  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/bank-accounts')
      .set({ 'x-access-token': accessToken })
      .send({
        number: 285992,
        currency: 'BRL',
        balance: 123.25,
        bankId
      })
      .expect(200)
  })
})

describe('GET /bank-accounts/:bankAccountId', () => {

  test('Should return 200 on success', async () => {
    const { insertedId } = await bankAccountCollection.insertOne({
      number: 285992,
      currency: 'BRL',
      balance: 123.25,
      cards: [],
      accountId,
      bankId
    })
    await request(app)
      .get(`/api/bank-accounts/${insertedId.toHexString()}`)
      .set({ 'x-access-token': accessToken })
      .expect(200)
  })

  test('Should return 404 if bankAccount not exists', async () => {
    await request(app)
      .get(`/api/bank-accounts/${new ObjectId().toHexString()}`)
      .set({ 'x-access-token': accessToken })
      .expect(404)
  })
})

describe('POST /bank-accounts/:bankAccountId/bank-cards', () => {

  test('Should return 200 on success', async () => {
    const { insertedId } = await bankAccountCollection.insertOne({
      number: 285992,
      currency: 'BRL',
      balance: 123.25,
      cards: [],
      accountId,
      bankId
    })
    await request(app)
      .post(`/api/bank-accounts/${insertedId.toHexString()}/bank-cards`)
      .set({ 'x-access-token': accessToken })
      .send({
        number: 5585411679142753,
        flag: 'any_flag',
        expiresAt: '2025-04-28T00:00:00',
      })
      .expect(200)
  })
})