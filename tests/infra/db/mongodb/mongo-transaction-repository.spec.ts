import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { mockAddIncomeTransactionModel } from "../../../domain/mocks"
import { MongoTransactionRepository } from "@/infra/db/mongodb/mongo-transaction-repository"

describe('MongoTransactionRepository', () => {
  let bankAccountId: string
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
    const bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
    const mongoBankAccount = await bankAccountCollection.insertOne({
    number: 285992,
    currency: 'BRL',
    balance: 123.25,
    cards: []
    })
    bankAccountId = mongoBankAccount.insertedId.toHexString()
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
      // Replace the string id's with a ObjectId, so that ObjectId does not returns a BSONError
    const transactionToAdd = Object.assign(mockAddIncomeTransactionModel(), { 
    bankAccountId
    })
    const transaction = await sut.add(transactionToAdd)
    expect(transaction).toBeTruthy()
  })

  test('Should return a transaction on loadById success', async () => {
    const sut = new MongoTransactionRepository()
    const transactionToAdd = Object.assign(mockAddIncomeTransactionModel(), { 
      bankAccountId
    })
    const { id } = await sut.add(transactionToAdd)
    const transaction = await sut.loadById(id)
    expect(transaction).toBeTruthy()
  })

  test('Should return null if an invalid id is passed to loadById', async () => {
    const sut = new MongoTransactionRepository()
    const transaction = await sut.loadById('invalid_id')
    expect(transaction).toBeFalsy()
  })

  test('Should return null if an invalid id is passed to loadByBankAccountId', async () => {
    const sut = new MongoTransactionRepository()
    const transaction = await sut.loadByBankAccountId('invalid_id')
    expect(transaction).toEqual([])
  })
})