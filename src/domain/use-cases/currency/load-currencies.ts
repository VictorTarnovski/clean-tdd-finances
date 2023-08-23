import { CurrencyModel } from "@/domain/models/currency"

export interface LoadCurrencies {
  load(): Promise<CurrencyModel[]>
}