import { MongoBankAccountRepository } from "./mongo-bank-account-repository"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoHelper from "../mongo-helper"
import { Collection, ObjectId } from "mongodb"

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
        const bankAccount = await sut.add({
            number: 123,
            currency: 'USD'
        })
        expect(bankAccount).toBeTruthy()
        expect(bankAccount.number).toBe(123)
        expect(bankAccount.currency).toBe('USD')
        expect(typeof bankAccount.id).toBe('string')
    })

    test('Should return an account on loadByID success', async () => {
        const sut = new MongoBankAccountRepository()
        const { insertedId } = await bankAccountCollection.insertOne({
            number: 123,
            currency: 'USD',
            balance: 0,
            cards: []
        })
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
        const { insertedId } = await bankAccountCollection.insertOne({
            number: 123,
            currency: 'USD',
            balance: 0,
            cards: [{ _id: new ObjectId(), number: 123, currency: 'USD' }]
        })
        const bankAccount = await sut.loadById(insertedId.toHexString())
        expect(bankAccount!.cards[0].id).toBeTruthy()
    })
})