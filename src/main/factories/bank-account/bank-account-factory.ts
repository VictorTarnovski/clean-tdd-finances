import { BankAccountController } from "../../../presentation/controllers/bank-account/bank-account-controller"
import { DbAddBankAccount } from "../../../data/use-cases/add-bank-account/db-add-bank-account"
import { MongoBankAccountRepository } from "../../../infra/db/mongodb/bank-account/mongo-bank-account-repository"
import { MongoLogRespository } from "../../../infra/db/mongodb/log/mongo-log-repository"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller.decorator"
import { makeBankAccountValidation } from "./bank-account-validation-factory"


export const makeBankAccountController = (): Controller => {
    const addBankAccountRepository = new MongoBankAccountRepository()
    const dbAddBankAccount = new DbAddBankAccount(addBankAccountRepository)
    const validationComposite = makeBankAccountValidation()
    const bankAccountController = new BankAccountController(dbAddBankAccount, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(bankAccountController, mongoLogRespository)
}