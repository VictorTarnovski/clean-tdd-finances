import { MongoBankCardRepository } from "@/infra/db/mongodb/mongo-bank-card-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { BankAccountModel } from "@/domain/models/bank-account"
import { ObjectId } from "mongodb"
import { mockAddBankCardModel } from "../../../domain/mocks"

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
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    await bankAccountsCollection.deleteMany()
    const { insertedId } = await bankAccountsCollection.insertOne({
      _id: new ObjectId(),
      number: 285992,
      currency: 'BRL',
      balance: 123.25,
      cards: [],
      accountId: 'any_account_id'
    })
    const mongoBankAccount = await bankAccountsCollection.findOne({ _id: insertedId })
    bankAccount = mongoHelper.map(mongoBankAccount)
  })

  test('Should return a card on add success', async () => {
    const sut = new MongoBankCardRepository()
    const bankAccountId = bankAccount!.id
    const bankCard = await sut.add(mockAddBankCardModel(), bankAccountId)
    expect(bankCard).toBeTruthy()
    expect(bankCard.number).toBe(5585411679142753)
    expect(bankCard.flag).toBe('any_flag')
    expect(bankCard.expiresAt).toStrictEqual(new Date('2025-04-28T00:00:00'))
    expect(bankCard.id).toBeTruthy()
  })

  test('Should return a card on loadById on success', async () => {
    const sut = new MongoBankCardRepository()
    const bankAccountId = bankAccount!.id
    const insertedCard = await sut.add(mockAddBankCardModel(), bankAccountId)
    const card = await sut.loadById(insertedCard.id, bankAccountId)
    expect(card).toBeTruthy()
  })

  test('Should return null if an invalid id is passed to loadById', async () => {
    const sut = new MongoBankCardRepository()
    const bankAccountId = bankAccount!.id
    const card = await sut.loadById('invalid_id', bankAccountId)
    expect(card).toBeFalsy()
  })
})