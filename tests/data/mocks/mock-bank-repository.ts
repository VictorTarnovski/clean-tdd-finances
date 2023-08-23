import { LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import { mockBankModels } from "../../domain/mocks"

export const mockLoadBanksRepository = () => {
  class LoadBanksRepositoryStub implements LoadBanksRepository {
    async loadBanks(): Promise<BankModel[]> {
      return mockBankModels()
    }
  }
  return new LoadBanksRepositoryStub()
}