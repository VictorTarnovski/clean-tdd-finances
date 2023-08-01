import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"


export const mockAddBankAccountModel = (): AddBankAccountModel => ({
  number: 285992,
  currency: 'BRL',
  balance: 123.25,
  cards: [],
  accountId: 'any_account_id'
})

export const mockBankAccountModel = (): BankAccountModel => ({
  id: 'any_bank_account_id',
  number: 285992,
  currency: 'BRL',
  balance: 123.25,
  cards: [
    {
      id: 'any_bank_card_id',
      number: 5585411679142753,
      flag: 'MASTER',
      expiresAt: '28/04/2025',
    }
  ],
  accountId: 'any_account_id'
})