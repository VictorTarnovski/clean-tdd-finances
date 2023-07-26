import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"

export class MongoLogRespository implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        const errorCollection = await mongoHelper.getCollection('errors')
        await errorCollection.insertOne({
            stack,
            date: new Date()
        }) 
    }
}