import { MongoAccountRepository } from "./account"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "../mongo-helper"
import { Collection } from "mongodb"

let accountCollection: Collection

describe('MongoAccountRepository', () => {

    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()
        await mongoHelper.connect(uri)
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })
    
    beforeEach(async () => {
        accountCollection = await mongoHelper.getCollection('accounts')
        await accountCollection.deleteMany()
    })

    const makeSut = () => {
        return new MongoAccountRepository()
    }
   test('Should return an acount on add sucess', async () => {
    const sut = makeSut()
    const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
   })

   test('Should return an acount on loadByEmail sucess', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account!.id).toBeTruthy()
    expect(account!.name).toBe('any_name')
    expect(account!.email).toBe('any_email@mail.com')
    expect(account!.password).toBe('any_password')
   })

   test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
   })
 }
) 