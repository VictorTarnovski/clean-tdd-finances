import { AddBankAccountController } from "../../../../../presentation/controllers/bank-account/add-bank-account/add-bank-account-controller"
import { Controller } from "../../../../../presentation/protocols"
import { makeDbAddBankAccount } from "../../../use-cases/bank-account/add-bank-account/db-add-bank-account"
import { makeBankAccountValidation } from "./add-bank-account-validation-factory"

export const makeBankAccountController = (): Controller => new AddBankAccountController(makeDbAddBankAccount(), makeBankAccountValidation())