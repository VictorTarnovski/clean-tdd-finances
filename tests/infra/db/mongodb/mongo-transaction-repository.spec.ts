import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { mockAddIncomeTransactionModel } from "../../../domain/mocks"
import { MongoTransactionRepository } from "@/infra/db/mongodb/mongo-transaction-repository"
describe('MongoTransactionRepository', () => {
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    const transactionCollection = await mongoHelper.getCollection('transactions')
    await transactionCollection.deleteMany()
  })

  test('Should return a transaction on add success', async () => {
    const sut = new MongoTransactionRepository()
    const transaction = await sut.add(mockAddIncomeTransactionModel())
    expect(transaction).toBeTruthy()
  })

  test('Should return a transaction on loadById success', async () => {
    const sut = new MongoTransactionRepository()
    const transactionCollection = await mongoHelper.getCollection('transactions')
    const { insertedId } = await transactionCollection.insertOne(mockAddIncomeTransactionModel())
    const transaction = await sut.load(insertedId.toHexString())
    expect(transaction).toBeTruthy()
  })

  test('Should return null if an invalid id is passed to loadById', async () => {
    const sut = new MongoTransactionRepository()
    const transaction = await sut.load('invalid_id')
    expect(transaction).toBeFalsy()
  })
})