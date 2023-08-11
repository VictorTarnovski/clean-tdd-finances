import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases"
import { mockTransactionModel } from "../../domain/mocks"

export const mockAddTransaction = (): AddTransaction => {
  class addTransaction implements AddTransaction {
    async add(account: AddTransactionModel): Promise<TransactionModel> {
      return mockTransactionModel()
    }
  }
  return new addTransaction()
}