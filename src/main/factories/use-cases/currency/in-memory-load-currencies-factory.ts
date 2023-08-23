import { InMemoryLoadCurrencies } from "@/data/use-cases"
import { InMemoryCurrencyRepository } from "@/infra/in-memory/currency/in-memory-currency-repository"

export const makeInMemoryLoadCurrencies = (): InMemoryLoadCurrencies => new InMemoryLoadCurrencies(new InMemoryCurrencyRepository())