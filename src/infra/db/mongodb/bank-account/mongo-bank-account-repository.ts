import { ObjectId } from "mongodb"
import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { SaveBalanceRepository } from "@/data/protocols/db/bank-account/save-balance-repository"

export class MongoBankAccountRepository implements AddBankAccountRepository, LoadBankAccountByIdRepository, SaveBalanceRepository {
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
    const bankAccount = mongoHelper.map(mongoBankAccount)
    bankAccount.cards = mongoHelper.mapCollection(bankAccount.cards)
    return bankAccount
  }
  async saveBalance(balance: number, bankAccountId: string): Promise<BankAccountModel> {
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    await bankAccountsCollection.findOneAndUpdate({ _id: new ObjectId(bankAccountId) }, { $set: { balance } })
    const mongoBankAccount = await bankAccountsCollection.findOne({ _id: new ObjectId(bankAccountId) })
    const bankAccount = await mongoHelper.map(mongoBankAccount)
    return bankAccount
  }

}