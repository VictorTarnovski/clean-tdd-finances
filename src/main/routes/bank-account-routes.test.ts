import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

let bankAccountCollection: Collection
let accountCollection: Collection
let accountId: string
let accessToken: string

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoHelper.connect(uri)

  // Creates the user account to authenticate
  accountCollection = await mongoHelper.getCollection('accounts')
  const hashed_password = await hash('any_password', 12)
  const { insertedId } = await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
  accountId = insertedId.toHexString()
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: insertedId }, { $set: { accessToken } })

})

beforeEach(async () => {
  bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
  bankAccountCollection.deleteMany()
  accessToken = sign({ id: accountId }, env.jwtSecret)
})

describe('POST /bank-accounts', () => {

  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/bank-accounts')
      .set({ 'x-access-token': accessToken })
      .send({
        number: 285992,
        currency: 'BRL',
        balance: 123.25
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
      accountId
    })
    await request(app)
      .get(`/api/bank-accounts/${insertedId.toHexString()}`)
      .set({ 'x-access-token': accessToken })
      .expect(200)
  })

  test('Should return 404 if bankAccount not exists', async () => {
    await request(app)
      .get(`/api/bank-accounts/${accountId}`)
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
      accountId
    })
    await request(app)
      .post(`/api/bank-accounts/${insertedId.toHexString()}/bank-cards`)
      .set({ 'x-access-token': accessToken })
      .send({
        number: 5585411679142753,
        flag: 'MASTER',
        expiresAt: '28/04/2025',
      })
      .expect(200)
  })
})