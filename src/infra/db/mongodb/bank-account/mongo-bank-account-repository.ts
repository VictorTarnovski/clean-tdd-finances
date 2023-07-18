import { AddBankAccountRepository } from "../../../../data/protocols/db/bank-account/add-bank-account-repository"
import { BankAccountModel } from "../../../../domain/models/bank-account"
import { AddBankAccountModel } from "../../../../domain/use-cases/add-bank-account"
import mongoHelper from "../mongo-helper"

export class MongoBankAccountRepository implements AddBankAccountRepository {
    async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
        const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')

        const { insertedId } = await bankAccountsCollection.insertOne(Object.assign({}, bankAccountData, { cards: [] }))
        const mongoBankAccount = await bankAccountsCollection.findOne(insertedId)
        const bankAccount = mongoHelper.map(mongoBankAccount)
        return bankAccount
    }
}