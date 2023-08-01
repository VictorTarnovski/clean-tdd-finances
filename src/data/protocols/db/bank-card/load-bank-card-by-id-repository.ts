import { BankCardModel } from "@/domain/models/bank-card"

export interface LoadBankCardByIdRepository {
  loadById(bankCardId: string, bankAccountId: string): Promise<BankCardModel | null>
}