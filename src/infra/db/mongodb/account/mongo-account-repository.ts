import { ObjectId } from "mongodb"
import { AddAccountRepository } from "../../../../data/protocols/db/account/add-account-repository"
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/account/load-account-by-email-repository"
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/account/update-access-token-repository"
import { AccountModel } from "../../../../domain/models/account"
import { AddAccountModel } from "../../../../domain/use-cases/add-account"
import mongoHelper from "../mongo-helper"
import { LoadAccountByTokenRepository } from "../../../../data/protocols/db/account/load-account-by-token-repository"

export class MongoAccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
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

    async updateAccessToken(id: string, token: string): Promise<void> {
        const accountsCollection = await mongoHelper.getCollection('accounts')
        await accountsCollection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                acessToken: token
            }
        })
    }

    async loadByToken(token: string, role?: string | undefined): Promise<AccountModel | null> {
        const accountsCollection = await mongoHelper.getCollection('accounts')
        const mongoAccount = await accountsCollection.findOne({ accessToken: token, role: role })
        if(mongoAccount) {
          const account = mongoHelper.map(mongoAccount)
          return account
        }
        return null
    }
}