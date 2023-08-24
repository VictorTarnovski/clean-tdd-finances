import { LoadBankByIdRepository, LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import { mockBankModel, mockBankModels } from "../../domain/mocks"

export const mockLoadBanksRepository = () => {
  class LoadBanksRepositoryStub implements LoadBanksRepository {
    async loadBanks(): Promise<BankModel[]> {
      return mockBankModels()
    }
  }
  return new LoadBanksRepositoryStub()
}

export const mockLoadBankByIdRepository = () => {
  class LoadBankByIdRepositoryStub implements LoadBankByIdRepository {
    async loadBankById(): Promise<BankModel> {
      return mockBankModel()
    }
  }
  return new LoadBankByIdRepositoryStub()
}