import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases"
import { mockIncomeTransactionModel } from "../../domain/mocks"

export const mockAddTransaction = (): AddTransaction => {
  class addTransaction implements AddTransaction {
    async add(account: AddTransactionModel): Promise<TransactionModel> {
      return mockIncomeTransactionModel()
    }
  }
  return new addTransaction()
}