import { BankModel } from "@/domain/models"
import { LoadBankById, LoadBanks } from "@/domain/use-cases"
import { mockBankModel, mockBankModels } from "../../domain/mocks"

export const mockLoadBankById = () => {
  class LoadBankByIdStub implements LoadBankById {
    async load(): Promise<BankModel> {
      return mockBankModel()
    }
  }
  return new LoadBankByIdStub()
}

export const mockLoadBanks = () => {
  class LoadBanksStub implements LoadBanks {
    async load(): Promise<BankModel[]> {
      return mockBankModels()
    }
  }
  return new LoadBanksStub()
}