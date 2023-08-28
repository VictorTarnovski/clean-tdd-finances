import { BankCardModel } from "@/domain/models/bank-card"
import { AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"

export const mockBankCardModel = (): BankCardModel => ({
  id: 'any_bank_card_id',
  number: 5585411679142753,
  flag: 'any_flag',
  expiresAt: new Date('2025-04-28T00:00:00'),
})

export const mockAddBankCardModel = (): AddBankCardModel => ({
  number: 5585411679142753,
  flag: 'any_flag',
  expiresAt: new Date('2025-04-28T00:00:00'),
})