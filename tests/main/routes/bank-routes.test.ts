import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Collection, ObjectId } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection
let accountId: string
let accessToken: string
let bankCollection: Collection

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoHelper.connect(uri)
  bankCollection = await mongoHelper.getCollection('banks')

  // Creates the user account to authenticate
  accountCollection = await mongoHelper.getCollection('accounts')
  const hashed_password = await hash('any_password', 12)
  const { insertedId } = await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
  accountId = insertedId.toHexString()
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: insertedId }, { $set: { accessToken } })

})

beforeEach(async () => {
  accessToken = sign({ id: accountId }, env.jwtSecret)
  await accountCollection.updateOne({ _id: new ObjectId(accountId) }, { $set: { accessToken } })
})

describe('GET /banks', () => {

  test('Should return 200 on success', async () => {
    await request(app)
      .get('/api/banks')
      .set({ 'x-access-token': accessToken })
      .expect(200)
  })
})

describe('GET /banks/:bankId', () => {

  test('Should return 200 on success', async () => {
    const { insertedId } = await bankCollection.insertOne({
      name: 'any_name',
      logo: 'any_logo.png',
    })
    await request(app)
      .get(`/api/banks/${insertedId.toHexString()}`)
      .set({ 'x-access-token': accessToken })
      .expect(200)
  })

  test('Should return 404 if bank not exists', async () => {
    const { insertedId } = await bankCollection.insertOne({
      name: 'any_name',
      logo: 'any_logo.png',
    })
    await request(app)
      .get(`/api/banks/${new ObjectId().toHexString()}`)
      .set({ 'x-access-token': accessToken })
      .expect(404)
  })
})