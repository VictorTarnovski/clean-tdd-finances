import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { mockAddTransactionModel } from "@/domain/tests"
import { MongoTransactionRepository } from "./mongo-transaction-repository"

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
    const transactionsCollection = await mongoHelper.getCollection('transactions')
    await transactionsCollection.deleteMany()
  })

  test('Should return a transaction on add success', async () => {
    const sut = new MongoTransactionRepository()
    const transaction = await sut.add(mockAddTransactionModel())
    expect(transaction).toBeTruthy()
  })
})