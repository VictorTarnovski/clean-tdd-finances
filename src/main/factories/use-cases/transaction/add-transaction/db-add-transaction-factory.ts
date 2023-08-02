import { DbAddTransaction } from "@/data/use-cases/transaction/add-transaction/db-add-transaction"
import { MongoTransactionRepository } from "@/infra/db/mongodb/transaction/mongo-transaction-repository"

export const makeDbAddTransaction = (): DbAddTransaction => new DbAddTransaction(new MongoTransactionRepository())