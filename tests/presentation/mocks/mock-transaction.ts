import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel, LoadTransactionsByBankAccount } from "@/domain/use-cases"
import { mockIncomeTransactionModel, mockTransactionModels } from "../../domain/mocks"

export const mockAddTransaction = (): AddTransaction => {
  class addTransaction implements AddTransaction {
    async add(account: AddTransactionModel): Promise<TransactionModel> {
      return mockIncomeTransactionModel()
    }
  }
  return new addTransaction()
}

export const mockLoadTransactionsByBankAccount = (): LoadTransactionsByBankAccount => {
  class loadTransactionsByBankAccount implements LoadTransactionsByBankAccount {
    async load(bankAccountId: string): Promise<TransactionModel[]> {
      return mockTransactionModels()
    }
  }
  return new loadTransactionsByBankAccount()
}