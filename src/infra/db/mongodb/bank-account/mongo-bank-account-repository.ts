import { ObjectId } from "mongodb"
import { AddBankAccountRepository } from "../../../../data/protocols/db/bank-account/add-bank-account-repository"
import { LoadBankAccountByIdRepository } from "../../../../data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { BankAccountModel } from "../../../../domain/models/bank-account"
import { AddBankAccountModel } from "../../../../domain/use-cases/add-bank-account"
import mongoHelper from "../mongo-helper"

export class MongoBankAccountRepository implements AddBankAccountRepository, LoadBankAccountByIdRepository {
    async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
        const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')

        const { insertedId } = await bankAccountsCollection.insertOne(Object.assign({}, bankAccountData, { cards: [] }))
        const mongoBankAccount = await bankAccountsCollection.findOne(insertedId)
        const bankAccount = mongoHelper.map(mongoBankAccount)
        return bankAccount
    }
    async loadById(id: string): Promise<BankAccountModel | null> {
        const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
        const mongoBankAccount = await bankAccountsCollection.findOne({ _id: new ObjectId(id) })
        if (!mongoBankAccount) return null
        for(const i in mongoBankAccount.cards) {
            mongoBankAccount.cards[i] = mongoHelper.map(mongoBankAccount.cards[i])
        }
        const bankAccount = mongoHelper.map(mongoBankAccount)
        return bankAccount
    }
}