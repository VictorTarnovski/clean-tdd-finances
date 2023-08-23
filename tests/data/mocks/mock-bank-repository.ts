import { LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"

export const mockLoadBanksRepository = () => {
  class LoadBanksRepositoryStub implements LoadBanksRepository {
    async loadBanks(): Promise<BankModel[]> {
      return []
    }
  }
  return new LoadBanksRepositoryStub()
}