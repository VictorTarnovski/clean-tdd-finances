import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/add-transaction"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"

export class MongoTransactionRepository implements AddTransactionRepository {
  async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transactionsCollection = await mongoHelper.getCollection('transactions')
    const { insertedId } = await transactionsCollection.insertOne(transactionData)
    const mongoTransaction = await transactionsCollection.findOne({ _id: insertedId })
    const transaction = mongoHelper.map(mongoTransaction)
    return transaction
  }
}