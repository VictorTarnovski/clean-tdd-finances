import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { mockBankAccountModel } from "./mock-bank-account"
import { mockBankCardModel } from "./mock-bank-card"

export const mockAddIncomeTransactionModel = (): AddTransactionModel => ({
  description: 'any_description',
  value: 100,
  type: 'income',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id'
})

export const mockIncomeTransactionModel = (): TransactionModel => {
  const { bankAccountId, bankCardId, ...props } = mockAddIncomeTransactionModel()  
  return {
    id: 'any_transaction_id',
    ...props,
    bankAccount: mockBankAccountModel()
  }
}

export const mockAddExpenseTransactionModel = (): AddTransactionModel => ({
  description: 'any_description',
  value: 50,
  type: 'expense',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id',
  bankCardId: 'any_bank_card_id',
})

export const mockExpenseTransactionModel = (): TransactionModel => {
  const { bankAccountId, bankCardId, ...props } = mockAddExpenseTransactionModel()  
  return {
    id: 'any_transaction_id',
    ...props,
    bankAccount: mockBankAccountModel(),
    bankCard: mockBankCardModel()
  }
}

export const mockTransactionModels = (): TransactionModel[] => ([mockIncomeTransactionModel(), mockExpenseTransactionModel()])