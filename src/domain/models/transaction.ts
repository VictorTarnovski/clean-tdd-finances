import { BankAccountModel } from "./bank-account"
import { BankCardModel } from "./bank-card"

export type TransactionModel = {
  id: string
  description: string
  value: number
  type: 'income' | 'expense',
  createdAt: Date,
  bankAccount: BankAccountModel
  bankCard?: BankCardModel
}