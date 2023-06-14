import { MongoMemoryServer } from "mongodb-memory-server"
import { Collection } from "mongodb"
import mongoHelper from "../mongo-helper"
import { MongoLogRespository } from "./log"

describe('MongoLogRespository', () => {
    let errorCollection: Collection

    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()
        await mongoHelper.connect(uri)
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    beforeEach(async () => {
        errorCollection = await mongoHelper.getCollection('errors')
        await errorCollection.deleteMany()
    })

    const makeSut = (): MongoLogRespository => {
        return new MongoLogRespository()
    }

    test('Should create an error log on sucess', async () => {
        const sut = makeSut()
        await sut.logError('any_stack')
        const count = await errorCollection.countDocuments()
        expect(count).toBe(1)
    })
})