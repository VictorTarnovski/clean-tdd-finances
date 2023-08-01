import { BankCardModel } from "@/domain/models/bank-card"

export interface LoadBankCardByIdRepository {
  loadById(id: string): Promise<BankCardModel | null>
}