import { MongoBankAccountRepository } from "./bank-account"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "../mongo-helper"

describe('MonngoBankAccountRepository', () => {

    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()
        await mongoHelper.connect(uri)
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })
                    
    test('Should return an account on sucess', async () => {
        const sut = new MongoBankAccountRepository()
        const bankAccount = await sut.add({ 
            number: 123,
            currency: 'USD'
        })
        expect(bankAccount).toBeTruthy()
        expect(bankAccount.number).toBe(123)
        expect(bankAccount.currency).toBe('USD')
        expect(typeof bankAccount.id).toBe('string')
    }) 
})