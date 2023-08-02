import { MongoBankAccountRepository } from "./mongo-bank-account-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { Collection, ObjectId } from "mongodb"
import { mockAddBankAccountModel, mockAddBankCardModel } from "@/domain/tests"

let bankAccountCollection: Collection

describe('MongoBankAccountRepository', () => {

  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
    await bankAccountCollection.deleteMany()
  })

  test('Should return an account on add success', async () => {
    const sut = new MongoBankAccountRepository()
    const bankAccount = await sut.add(mockAddBankAccountModel())
    expect(bankAccount).toBeTruthy()
    expect(bankAccount.number).toBe(285992)
    expect(bankAccount.currency).toBe('BRL')
    expect(bankAccount.id).toBeTruthy()
  })

  test('Should return an account on loadByID success', async () => {
    const sut = new MongoBankAccountRepository()
    const { insertedId } = await bankAccountCollection.insertOne(mockAddBankAccountModel())
    const bankAccount = await sut.loadById(insertedId.toHexString())
    expect(bankAccount).toBeTruthy()
  })

  test('Should return null if loadByID returns null', async () => {
    const sut = new MongoBankAccountRepository()
    const bankAccount = await sut.loadById(new ObjectId().toHexString())
    expect(bankAccount).toBeFalsy()
  })

  test('Should map the bankCards of the bankAccount on loadByID success', async () => {
    const sut = new MongoBankAccountRepository()
    const { insertedId } = await bankAccountCollection.insertOne(mockAddBankAccountModel())
    bankAccountCollection.updateOne({ _id: insertedId }, { $push: { "cards": Object.assign( {}, { _id: new ObjectId() }, mockAddBankCardModel() ) } })
    const bankAccount = await sut.loadById(insertedId.toHexString())
    expect(bankAccount!.cards[0].id).toBeTruthy()
  })

  test('Should change the Balance of the bankAccount on saveBalance success', async () => {
    const sut = new MongoBankAccountRepository()
    const { insertedId } = await bankAccountCollection.insertOne(mockAddBankAccountModel())
    const balance = mockAddBankAccountModel().balance + 10
    const bankAccount = await sut.saveBalance(balance, insertedId.toHexString())
    expect(bankAccount.balance).toBe(balance)
  })
})