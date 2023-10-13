import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Collection, ObjectId } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

let transactionCollection: Collection
let accountCollection: Collection
let bankAccountCollection: Collection
let accountId: string
let bankAccountId: string
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

  // Creates the bank Account
  bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
  const mongoBankAccount = await bankAccountCollection.insertOne({
    number: 285992,
    currency: 'BRL',
    balance: 123.25,
    cards: [],
    accountId
  })
  bankAccountId = mongoBankAccount.insertedId.toHexString()
})

beforeEach(async () => {
  transactionCollection = await mongoHelper.getCollection('transactions')
  transactionCollection.deleteMany()
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: new ObjectId(accountId) }, { $set: { accessToken } })
})

describe('POST /transactions', () => {

  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/transactions')
      .set({ 'x-access-token': accessToken })
      .send({
        description: 'any_description',
        value: 10,
        type: 'income',
        bankAccountId
      })
      .expect(200)
  })

  test('Should return 404 if bankAccount not exists', async () => {
    await request(app)
      .post('/api/transactions')
      .set({ 'x-access-token': accessToken })
      .send({
        description: 'any_description',
        value: 10,
        type: 'income',
        bankAccountId: new ObjectId().toHexString()
      })
      .expect(404)
  })

  test('Should return 404 if bankCard not exists', async () => {
    await request(app)
      .post('/api/transactions')
      .set({ 'x-access-token': accessToken })
      .send({
        description: 'any_description',
        value: 10,
        type: 'income',
        bankAccountId,
        bankCardId: new ObjectId().toHexString()
      })
      .expect(404)
  })
})