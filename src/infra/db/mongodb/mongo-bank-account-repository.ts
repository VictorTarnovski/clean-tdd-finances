import { ObjectId } from "mongodb"
import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { SaveBalanceRepository } from "@/data/protocols/db/bank-account/save-balance-repository"
import { LoadBankByIdRepository } from "@/data/protocols/db"
import fs from "node:fs"

export class MongoBankAccountRepository implements AddBankAccountRepository, LoadBankAccountByIdRepository, SaveBalanceRepository {

  constructor(private readonly loadBankByIdRepository: LoadBankByIdRepository) {}

  async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    const { insertedId } = await bankAccountsCollection.insertOne(Object.assign({}, bankAccountData, { cards: [] }))
    const bankAccount = await this.loadById(insertedId.toHexString())
    return bankAccount!
  }

  async loadById(bankAccountId: string): Promise<any> {
    const isValid = ObjectId.isValid(bankAccountId)
    if (!isValid) { return null }
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    const mongoBankAccount = await bankAccountsCollection.findOne({ _id: new ObjectId(bankAccountId) })
    if (!mongoBankAccount) return null

    const { bankId, cards, accountId, ...accountProps } = mongoHelper.map(mongoBankAccount)

    const bank = await this.loadBankByIdRepository.loadBankById(bankId)
    const bankAccount = Object.assign({}, accountProps, { cards: mongoHelper.mapCollection(cards), bank, accountId })
    return bankAccount
  }

  async saveBalance(balance: number, bankAccountId: string): Promise<BankAccountModel> {
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    await bankAccountsCollection.findOneAndUpdate({ _id: new ObjectId(bankAccountId) }, { $set: { balance } })
    return await this.loadById(bankAccountId)
  }

}