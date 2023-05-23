import { BankAccountController } from "../../presentation/controllers/bank-account/bank-account"
import { AddBankAccountRepository } from "../../data/protocols/add-bank-account-repository"
import { DbAddBankAccount } from "../../data/use-cases/add-bank-account/db-add-bank-account"
import { FirebaseAccountRepository } from "../../infra/db/firebase/account-repository/account"
import { AxiosAdapter } from "../../infra/http/axios/axios-adapter"

export const makeBankAccountController = (): BankAccountController => {
    const httpService = new AxiosAdapter()
    const addBankAccountRepository = new FirebaseAccountRepository(httpService)
    const dbAddBankAccount = new DbAddBankAccount(addBankAccountRepository)
    return new BankAccountController(dbAddBankAccount)
}