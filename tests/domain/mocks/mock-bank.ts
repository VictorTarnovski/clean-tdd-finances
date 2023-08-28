import { BankModel } from "@/domain/models"

export const mockBankModel = (): BankModel => (
  {
    id: 'any_bank_id',
    name: 'any_name',
    logo: 'any_logo.png',
  })

export const mockBankModels = (): BankModel[] => ([
  {
    id: 'any_bank_id',
    name: 'any_name',
    logo: 'any_logo.png',
  },
  {
    id: 'any_other_bank_id',
    name: 'any_other_name',
    logo: 'any_other_logo.png',
  }])