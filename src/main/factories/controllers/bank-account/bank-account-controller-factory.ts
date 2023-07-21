import { BankAccountController } from "../../../../presentation/controllers/bank-account/bank-account-controller"
import { Controller } from "../../../../presentation/protocols"
import { makeDbAddBankAccount } from "../../use-cases/add-bank-account/db-add-bank-account"
import { makeBankAccountValidation } from "./bank-account-validation-factory"

export const makeBankAccountController = (): Controller => new BankAccountController(makeDbAddBankAccount(), makeBankAccountValidation())