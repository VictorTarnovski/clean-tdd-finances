import { MongoAccountRepository } from "./account"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "../mongo-helper"


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
        const bankAccountCollection = await mongoHelper.getCollection('bank-accounts')
        await bankAccountCollection.deleteMany()
    })

   test('Should return an acount on sucess', async () => {
    const sut = new MongoAccountRepository()
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
 }
) 