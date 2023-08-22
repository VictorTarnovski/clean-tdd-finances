import { LoadCurrenciesRepository } from "@/data/protocols/in-memory"
import { CurrencyModel } from "@/domain/models"
import { mockCurrencyModels } from "../../domain/mocks/mock-currency"

export const mockLoadCurrenciesRepository = (): LoadCurrenciesRepository => {
  class LoadCurrenciesRepositoryStub implements LoadCurrenciesRepository {
    async loadCurrencies(): Promise<CurrencyModel[]> {
      return mockCurrencyModels()
    }
  }
  return new LoadCurrenciesRepositoryStub()
}