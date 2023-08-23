import { LoadCurrenciesRepository } from "@/data/protocols/in-memory"
import { CurrencyModel } from "@/domain/models"
import { LoadCurrencies } from "@/domain/use-cases"

export class InMemoryLoadCurrencies implements LoadCurrencies {
  constructor(private readonly loadCurrenciesRepository: LoadCurrenciesRepository) {}
  async load(): Promise<CurrencyModel[]> {
    const currencies = await this.loadCurrenciesRepository.loadCurrencies()
    return currencies
  }
}