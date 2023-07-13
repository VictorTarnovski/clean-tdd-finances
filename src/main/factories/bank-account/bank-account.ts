import { BankAccountController } from "../../../presentation/controllers/bank-account/bank-account"
import { DbAddBankAccount } from "../../../data/use-cases/add-bank-account/db-add-bank-account"
import { MongoBankAccountRepository } from "../../../infra/db/mongodb/bank-account-respository/bank-account"
import { MongoLogRespository } from "../../../infra/db/mongodb/log-repository/log"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log"
import { makeBankAccountValidation } from "./bank-account-validation"


export const makeBankAccountController = (): Controller => {
    const addBankAccountRepository = new MongoBankAccountRepository()
    const dbAddBankAccount = new DbAddBankAccount(addBankAccountRepository)
    const validationComposite = makeBankAccountValidation()
    const bankAccountController = new BankAccountController(dbAddBankAccount, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(bankAccountController, mongoLogRespository)
}