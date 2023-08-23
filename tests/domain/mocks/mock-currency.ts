import { CurrencyModel } from "@/domain/models"

export const mockCurrencyModels = (): CurrencyModel[] => ([
  {
    code: "BRL",
    currency: "Brazilian Real"
  },
  {
    code: "USD",
    currency: "US Dollar"
  },
  {
    code: "JPY",
    currency: "Yen"
  }
])