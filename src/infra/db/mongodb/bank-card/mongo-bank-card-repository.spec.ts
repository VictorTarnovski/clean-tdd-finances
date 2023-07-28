import { MongoBankCardRepository } from "./mongo-bank-card-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { BankAccountModel } from "@/domain/models/bank-account"
import { ObjectId } from "mongodb"
import { mockAddBankCardModel } from "@/domain/tests"

describe('MongoBankCardRepository', () => {
  let bankAccount: BankAccountModel | null
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    const bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
    await bankAccountCollection.deleteMany()
    const { insertedId } = await bankAccountCollection.insertOne({
      _id: new ObjectId(),
      number: 285992,
      currency: 'BRL',
      balance: 123.25,
      cards: [],
      accountId: 'any_account_id'
    })
    const mongoBankAccount = await bankAccountCollection.findOne({ _id: insertedId })
    bankAccount = mongoHelper.map(mongoBankAccount)
  })

  test('Should return an card on success', async () => {
    const sut = new MongoBankCardRepository()
    const bankAccountId = bankAccount!.id
    const bankCard = await sut.add(mockAddBankCardModel(), bankAccountId)
    expect(bankCard).toBeTruthy()
    expect(bankCard.number).toBe(5585411679142753)
    expect(bankCard.flag).toBe('MASTER')
    expect(bankCard.expiresAt).toBe('28/04/2025')
    expect(bankCard.id).toBeTruthy()
  })
})