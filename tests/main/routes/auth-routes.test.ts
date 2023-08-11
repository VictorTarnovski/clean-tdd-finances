import request from 'supertest'
import app from '@/main/config/app'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoHelper.connect(uri)
})

beforeEach(async () => {
  accountCollection = await mongoHelper.getCollection('accounts')
  accountCollection.deleteMany()
})

describe('POST /signup', () => {

  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Victor',
        email: 'victor@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })

  test('Should return 403 if e-mail is in use', async () => {
    const hashed_password = await hash('any_password', 12)
    await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Victor',
        email: 'victor@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(403)
  })
})

describe('POST /login', () => {

  test('Should return 200 on success', async () => {
    const hashed_password = await hash('any_password', 12)
    await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
    await request(app)
      .post('/api/login')
      .send({
        email: 'victor@mail.com',
        password: 'any_password'
      })
      .expect(200)
  })

  test('Should return 401 if there is no acount with provided e-mail', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'victor@mail.com',
        password: 'any_password'
      })
      .expect(401)
  })

  test('Should return 401 if password does not match account password', async () => {
    const hashed_password = await hash('any_password', 12)
    await accountCollection.insertOne({ name: 'Victor', email: 'victor@mail.com', password: hashed_password })
    await request(app)
      .post('/api/login')
      .send({
        email: 'victor@mail.com',
        password: 'other_password'
      })
      .expect(401)
  })
})