import { LoadCurrenciesController } from "@/presentation/controllers/currency/load-currencies-controller"
import { Controller } from "@/presentation/protocols"
import { makeInMemoryLoadCurrencies } from "@/main/factories/use-cases/currency/in-memory-load-currencies-factory"


export const makeLoadCurrenciesController = (): Controller => new LoadCurrenciesController(makeInMemoryLoadCurrencies())