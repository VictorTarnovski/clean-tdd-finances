import { BankCardController } from "../../../../presentation/controllers/bank-cards/bank-card-controller"
import { Controller } from "../../../../presentation/protocols"
import { makeBankCardValidation } from "./bank-card-validation-factory"
import { makeDbAddBankCard } from "../../use-cases/add-bank-card/db-add-bank-card"


export const makeBankCardController = (): Controller => new BankCardController(makeDbAddBankCard(), makeBankCardValidation())