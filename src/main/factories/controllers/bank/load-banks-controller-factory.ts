import { LoadBanksController } from "@/presentation/controllers/bank/load-banks-controller"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadBanks } from "@/main/factories/use-cases/bank/db-load-banks-factory"


export const makeLoadBanksController = (): Controller => new LoadBanksController(makeDbLoadBanks())