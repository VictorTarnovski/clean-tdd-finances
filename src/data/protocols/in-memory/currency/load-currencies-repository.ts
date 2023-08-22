import { CurrencyModel } from "@/domain/models"

export interface LoadCurrenciesRepository {
  loadCurrencies(): Promise<CurrencyModel[]>
}