import { BankModel } from "@/domain/models"
import { LoadBanks } from "@/domain/use-cases"
import { mockBankModels } from "../../domain/mocks"

export const mockLoadBanks = () => {
  class LoadBanksStub implements LoadBanks {
    async load(): Promise<BankModel[]> {
      return mockBankModels()
    }
  }
  return new LoadBanksStub()
}