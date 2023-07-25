import { BankCardController } from "../../../../../presentation/controllers/bank-cards/bank-card-controller"
import { Controller } from "../../../../../presentation/protocols"
import { makeBankCardValidation } from "./add-bank-card-validation-factory"
import { makeDbAddBankCard } from "../../../use-cases/bank-card/add-bank-card/db-add-bank-card"


export const makeBankCardController = (): Controller => new BankCardController(makeDbAddBankCard(), makeBankCardValidation())