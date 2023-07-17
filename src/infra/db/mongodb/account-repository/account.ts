import { AddAccountRepository } from "../../../../data/protocols/db/add-account-repository"
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/load-account-by-email-repository"
import { AccountModel } from "../../../../domain/models/account"
import { AddAccountModel } from "../../../../domain/use-cases/add-account"
import mongoHelper from "../mongo-helper"

export class MongoAccountRepository implements AddAccountRepository, LoadAccountByEmailRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountsCollection = await mongoHelper.getCollection('accounts')

        const { insertedId } = await accountsCollection.insertOne(accountData)
        const mongoAccount = await accountsCollection.findOne(insertedId)
        const account = mongoHelper.map(mongoAccount)
        return account
    }

    async loadByEmail(email: string): Promise<AccountModel | null> {
        const accountsCollection = await mongoHelper.getCollection('accounts')
        const mongoAccount = await accountsCollection.findOne({ email })
        if(mongoAccount) {
          const account = mongoHelper.map(mongoAccount)
          return account
        }
        return null
    }
}