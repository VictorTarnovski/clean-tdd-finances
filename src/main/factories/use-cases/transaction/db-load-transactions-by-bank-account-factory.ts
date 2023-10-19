import { DbLoadTransactionsByBankAccount } from "@/data/use-cases"
import { MongoTransactionRepository } from "@/infra/db/mongodb/mongo-transaction-repository"

export const makeDbLoadTransactionsByBankAccount = (): DbLoadTransactionsByBankAccount => new DbLoadTransactionsByBankAccount(new MongoTransactionRepository())