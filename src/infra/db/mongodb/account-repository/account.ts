import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AccountModel } from "../../../../domain/models/account"
import { AddAccountModel } from "../../../../domain/use-cases/add-account"
import mongoHelper from "../mongo-helper"

export class MongoAccountRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountsCollection = await mongoHelper.getCollection('accounts')

        await accountsCollection.insertOne(accountData)
        const mongoAccount = await accountsCollection.findOne(accountData)
        const account = mongoHelper.map(mongoAccount)
        return account
    }
}