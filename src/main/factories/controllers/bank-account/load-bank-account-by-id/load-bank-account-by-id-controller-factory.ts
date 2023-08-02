import { LoadBankAccountByIdController } from "@/presentation/controllers/bank-account/load-bank-account-by-id/load-bank-account-by-id-controller"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/load-bank-account-by-id/db-load-bank-account-by-id-factory"
import { makeDbLoadAccountById } from "@/main/factories/use-cases/account/load-account-by-id/db-load-account-by-token-factory"
import { LogControllerDecorator } from "@/main/decorators/log-controller.decorator"
import { MongoLogRespository } from "@/infra/db/mongodb/log/mongo-log-repository"

export const makeLoadBankAccountByIdController = (): Controller => new LogControllerDecorator(new LoadBankAccountByIdController(makeDbLoadBankAccountById(), makeDbLoadAccountById()), new MongoLogRespository())