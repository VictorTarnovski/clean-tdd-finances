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