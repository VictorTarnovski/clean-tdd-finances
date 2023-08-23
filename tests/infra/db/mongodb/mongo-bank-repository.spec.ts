import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { ObjectId } from "mongodb"
import { mockBankModels } from "../../../domain/mocks"

describe('MongoBankRepository', () => {
  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoHelper.connect(uri)
    const bankCollection = await mongoHelper.getCollection('banks')
    await bankCollection.deleteMany()
    await bankCollection.insertOne({
      _id: new ObjectId(),
      name: 'any_name',
      logo: 'any_logo.png',
    })
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return a list of banks on loadBanks success', async () => {
    const sut = new MongoBankRepository()
    const banks = await sut.loadBanks()
    expect(banks).toBeTruthy()
  })
})