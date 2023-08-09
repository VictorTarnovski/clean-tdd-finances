import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"

export const mockTransactionModel = (): TransactionModel => ({
  id: 'any_transaction_id',
  description: 'any_description',
  value: 100,
  operation: 'addition',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id',
  bankCardId: 'any_bank_card_id',
})

export const mockTransactionModels = (): TransactionModel[] => ([{
  id: 'any_transaction_id',
  description: 'any_description',
  value: 100,
  operation: 'addition',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id',
  bankCardId: 'any_bank_card_id',
},
{
  id: 'any_transaction_id',
  description: 'any_description',
  value: 50,
  operation: 'subtraction',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id',
  bankCardId: 'any_bank_card_id',
}])

export const mockAddTransactionModel = (): AddTransactionModel => ({
  description: 'any_description',
  value: 100,
  operation: 'addition',
  createdAt: new Date(),
  bankAccountId: 'any_bank_account_id',
  bankCardId: 'any_bank_card_id',
})