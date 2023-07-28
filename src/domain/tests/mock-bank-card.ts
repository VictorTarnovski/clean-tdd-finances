import { BankCardModel } from "@/domain/models/bank-card"
import { AddBankCardModel } from "@/domain/use-cases/add-bank-card"

export const mockBankCardModel = (): BankCardModel => ({
  id: 'any_bank_card_id',
  number: 5585411679142753,
  flag: 'MASTER',
  expiresAt: '28/04/2025',
})

export const mockAddBankCardModel = (): AddBankCardModel => ({
  number: 5585411679142753,
  flag: 'MASTER',
  expiresAt: '28/04/2025',
})