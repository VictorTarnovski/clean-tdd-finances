import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { ObjectId } from "mongodb"

let bankId: string

describe('MongoBankRepository', () => {
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
    const bankCollection = await mongoHelper.getCollection('banks')
    await bankCollection.deleteMany()
    const { insertedId } = await bankCollection.insertOne({
      _id: new ObjectId(),
      name: 'any_name',
      logo: 'any_logo.png',
    })
    bankId = insertedId.toHexString()
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return a list of banks on loadBanks success', async () => {
    const sut = new MongoBankRepository()
    const banks = await sut.loadBanks()
    expect(banks).toBeTruthy()
  })

  test('Should return a bank on loadById success', async () => {
    const sut = new MongoBankRepository()
    const bank = await sut.loadBankById(bankId)
    expect(bank).toBeTruthy()
    expect(bank?.name).toBe('any_name')
    expect(bank?.logo).toBe('any_logo.png')
  })

  test('Should return null on loadById fails', async () => {
    const sut = new MongoBankRepository()
    const bank = await sut.loadBankById(new ObjectId().toHexString())
    expect(bank).toBeFalsy()
  })

  test('Should return null if an invalid id is passed to loadById', async () => {
    const sut = new MongoBankRepository()
    const bank = await sut.loadBankById('invalid_id')
    expect(bank).toBeFalsy()
  })
})