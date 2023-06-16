import { MongoBankCardRepository } from "./bank-card"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "../mongo-helper"
import { BankAccountModel } from "../../../../domain/models/bank-account"

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
        const { insertedId } = await bankAccountCollection.insertOne({ number: 123, currency: 'USD' })
        const mongoBankAccount = await bankAccountCollection.findOne({ _id: insertedId})
        bankAccount = mongoHelper.map(mongoBankAccount)
    })
    
    test('Should return an card on sucess', async () => {
        const sut = new MongoBankCardRepository()
        const bankAccountId = bankAccount!.id
        const bankCard = await sut.add({ 
            number: 123,
            flag: 'VISA',
            expiresAt: "06/14/2027"
        }, bankAccountId)
        expect(bankCard).toBeTruthy()
        expect(bankCard.number).toBe(123)
        expect(bankCard.flag).toBe('VISA')
        expect(bankCard.expiresAt).toBe('06/14/2027')
        expect(typeof bankCard.id).toBe('string')
    }) 
})