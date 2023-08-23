import { LoadCurrenciesRepository } from "@/data/protocols/in-memory"
import { CurrencyModel } from "@/domain/models"

export class InMemoryCurrencyRepository implements LoadCurrenciesRepository {
  async loadCurrencies(): Promise<CurrencyModel[]> {
    return [
      { code: 'BRL', currency: 'Brazilian Real' },
      { code: 'EUR', currency: 'Euro' },
      { code: 'GBP', currency: 'Pound Sterling' },
      { code: 'JPY', currency: 'Yen' },
      { code: 'USD', currency: 'US Dollar' }
    ]
  }
}