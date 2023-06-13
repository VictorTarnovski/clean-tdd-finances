import { BankAccountController } from "../../presentation/controllers/bank-account/bank-account"
import { DbAddBankAccount } from "../../data/use-cases/add-bank-account/db-add-bank-account"
import { FirebaseAccountRepository } from "../../infra/db/firebase/account-repository/account"
import { AxiosAdapter } from "../../infra/http/axios/axios-adapter"
import { Controller } from "../../presentation/protocols"
import { LogControllerDecorator } from "../decorators/log"

export const makeBankAccountController = (): Controller => {
    const httpService = new AxiosAdapter()
    const addBankAccountRepository = new FirebaseAccountRepository(httpService)
    const dbAddBankAccount = new DbAddBankAccount(addBankAccountRepository)
    const bankAccountController = new BankAccountController(dbAddBankAccount)
    return bankAccountController //new LogControllerDecorator(bankAccountController)
}