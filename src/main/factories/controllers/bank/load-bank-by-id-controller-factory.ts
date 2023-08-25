import { LoadBankByIdController } from "@/presentation/controllers/bank/load-bank-by-id-controller"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadBankById } from "@/main/factories/use-cases/bank/db-load-bank-by-id-factory"


export const makeLoadBankByIdController = (): Controller => new LoadBankByIdController(makeDbLoadBankById())