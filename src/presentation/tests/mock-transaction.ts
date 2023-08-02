import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { mockTransactionModel } from "@/domain/tests"

export const mockAddTransaction = (): AddTransaction => {
  class addTransaction implements AddTransaction {
    async add(account: AddTransactionModel): Promise<TransactionModel> {
      return mockTransactionModel()
    }
  }
  return new addTransaction()
}