import { AddTransactionRepository } from "../protocols/db/transaction/add-transaction-repository"
import { TransactionModel } from "@/domain/models/transaction"
import { mockTransactionModel } from "@/domain/tests"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"

export const mockAddTransactionRepository = () => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
      return mockTransactionModel()
    }
  }

  return new AddTransactionRepositoryStub()
}