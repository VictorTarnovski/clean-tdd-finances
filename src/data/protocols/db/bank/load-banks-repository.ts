import { BankModel } from "@/domain/models"

export interface LoadBanksRepository {
  loadBanks(): Promise<BankModel[]>
}