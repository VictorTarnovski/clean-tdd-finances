import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { BankAccountModel, BankCardModel } from "@/domain/models"
import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { LoadTransactionById } from "@/domain/use-cases/transaction/load-transaction-by-id"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { ObjectId } from "mongodb"

export class MongoTransactionRepository implements AddTransactionRepository, LoadTransactionById {
  async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transactionsCollection = await mongoHelper.getCollection('transactions')
    const { insertedId } = await transactionsCollection.insertOne(transactionData)
    const transaction = await this.loadById(insertedId.toHexString())
    return transaction!
  }
  async loadById(transactionId: string): Promise<TransactionModel | null> {
    const isValid = ObjectId.isValid(transactionId)
    if (isValid === false) { return null }

    const transactionsCollection = await mongoHelper.getCollection('transactions')
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')

    const { bankAccountId, bankCardId, ...trans }: any = await transactionsCollection.findOne({ _id: new ObjectId(transactionId) })
    if (!trans) return null
        
    const mongoBankAccount: any = await bankAccountsCollection.findOne({
        _id: new ObjectId(bankAccountId)
    })

    const bankAccount = mongoHelper.map(mongoBankAccount)

    bankAccount.cards = await mongoHelper.mapCollection(bankAccount.cards)

    const transactionCard = bankAccount.cards.find((card: BankCardModel) => card.id === bankCardId)
    const transaction = Object.assign({}, mongoHelper.map(trans), { bankAccount }, { bankCard: transactionCard })

    return transaction
  }
}