import { Collection, ObjectId } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongoAccountRepository } from "@/infra/db/mongodb/mongo-account-repository"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"

let accountCollection: Collection

const makeSut = () => new MongoAccountRepository()

describe('Add', () => {

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

    test('Should return an acount on add success', async () => {
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
}
)

describe('LoadByEmail', () => {

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

    test('Should return an acount on loadByEmail success', async () => {
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

describe('UpdateAccessToken', () => {

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

    test('Should update the account accessToken on updateAccessToken success', async () => {
        const sut = makeSut()
        const { insertedId } = await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password'
        })
        await sut.updateAccessToken(insertedId.toHexString(), 'any_token')
        const account = await accountCollection.findOne({ _id: insertedId })
        expect(account).toBeTruthy()
        expect(account!.accessToken).toBe('any_token')
    })
}
)

describe('LoadByToken', () => {

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

    test('Should return an acount on loadByToken without role', async () => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            accessToken: 'any_token'
        })
        const account = await sut.loadByToken('any_token')
        expect(account).toBeTruthy()
        expect(account!.id).toBeTruthy()
        expect(account!.name).toBe('any_name')
        expect(account!.email).toBe('any_email@mail.com')
        expect(account!.password).toBe('any_password')
    })

    test('Should return an acount on loadByToken with admin role', async () => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            accessToken: 'any_token',
            role: 'admin'
        })
        const account = await sut.loadByToken('any_token', 'admin')
        expect(account).toBeTruthy()
        expect(account!.id).toBeTruthy()
        expect(account!.name).toBe('any_name')
        expect(account!.email).toBe('any_email@mail.com')
        expect(account!.password).toBe('any_password')
    })

    test('Should return null on loadByToken with invalid role', async () => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            accessToken: 'any_token'
        })
        const account = await sut.loadByToken('any_token', 'admin')
        expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken if user is admin', async () => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            accessToken: 'any_token',
            role: 'admin'
        })
        const account = await sut.loadByToken('any_token')
        expect(account).toBeTruthy()
        expect(account!.id).toBeTruthy()
        expect(account!.name).toBe('any_name')
        expect(account!.email).toBe('any_email@mail.com')
        expect(account!.password).toBe('any_password')
    })

    test('Should return null if loadByToken fails', async () => {
        const sut = makeSut()
        const account = await sut.loadByToken('any_token')
        expect(account).toBeFalsy()
    })
}
)

describe('LoadById', () => {

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

    test('Should return an acount on loadById on success', async () => {
        const sut = makeSut()
        const { insertedId } = await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            accessToken: 'any_token'
        })
        const account = await sut.loadById(insertedId.toHexString())
        expect(account).toBeTruthy()
        expect(account?.id).toBeTruthy()
        expect(account?.name).toBe('any_name')
        expect(account?.email).toBe('any_email@mail.com')
        expect(account?.password).toBe('any_password')
    })

    test('Should return null if loadById fails', async () => {
        const sut = makeSut()
        const account = await sut.loadById(new ObjectId().toHexString())
        expect(account).toBeFalsy()
    })

    test('Should return null if an invalid id is passed', async () => {
        const sut = makeSut()
        const account = await sut.loadById('invalid_id')
        expect(account).toBeNull()
    })
}
)