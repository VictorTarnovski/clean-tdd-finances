import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { LoadTransactionById } from "@/domain/use-cases/transaction/load-transaction-by-id"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { ObjectId } from "mongodb"

export class MongoTransactionRepository implements AddTransactionRepository, LoadTransactionById {
  async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transactionsCollection = await mongoHelper.getCollection('transactions')
    const { insertedId } = await transactionsCollection.insertOne(transactionData)
    const mongoTransaction = await transactionsCollection.findOne({ _id: insertedId })
    const transaction = mongoHelper.map(mongoTransaction)
    return transaction
  }
  async load(transactionId: string): Promise<TransactionModel | null> {
    const transactionsCollection = await mongoHelper.getCollection('transactions')
    const mongoTransaction = await transactionsCollection.findOne({ _id: new ObjectId(transactionId) })
    if(!mongoTransaction) return null
    const transaction = mongoHelper.map(mongoTransaction)
    return transaction
  }
}