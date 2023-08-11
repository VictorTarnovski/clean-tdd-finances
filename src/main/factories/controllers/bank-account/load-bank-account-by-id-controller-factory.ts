import { LoadBankAccountByIdController } from "@/presentation/controllers/bank-account/load-bank-account-by-id-controller"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/db-load-bank-account-by-id-factory"
import { makeDbLoadAccountById } from "@/main/factories/use-cases/account/db-load-account-by-id-factory"
import { LogControllerDecorator } from "@/main/decorators/log-controller.decorator"
import { MongoLogRespository } from "@/infra/db/mongodb/mongo-log-repository"

export const makeLoadBankAccountByIdController = (): Controller => new LogControllerDecorator(new LoadBankAccountByIdController(makeDbLoadBankAccountById(), makeDbLoadAccountById()), new MongoLogRespository())