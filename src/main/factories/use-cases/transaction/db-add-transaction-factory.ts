import { DbAddTransaction } from "@/data/use-cases/transaction/db-add-transaction"
import { MongoTransactionRepository } from "@/infra/db/mongodb/mongo-transaction-repository"

export const makeDbAddTransaction = (): DbAddTransaction => new DbAddTransaction(new MongoTransactionRepository())