import { BankModel } from "@/domain/models"

export interface LoadBankByIdRepository {
  loadBankById(bankId: string): Promise<BankModel | null>
}