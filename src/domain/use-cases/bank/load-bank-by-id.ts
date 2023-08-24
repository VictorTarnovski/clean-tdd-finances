import { BankModel } from "@/domain/models"

export interface LoadBankById {
  load(bankId: string): Promise<BankModel | null>
}