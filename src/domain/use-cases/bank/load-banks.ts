import { BankModel } from "@/domain/models"

export interface LoadBanks {
  load(): Promise<BankModel[]>
}