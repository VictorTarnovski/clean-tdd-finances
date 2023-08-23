import { CurrencyModel } from "@/domain/models"
import { LoadCurrencies } from "@/domain/use-cases"
import { mockCurrencyModels } from "../../domain/mocks/mock-currency"

export const mockLoadCurrencies = () => {
  class LoadCurrenciesStub implements LoadCurrencies {
    async load(): Promise<CurrencyModel[]> {
      return mockCurrencyModels()
    }
  }
  return new LoadCurrenciesStub()
}