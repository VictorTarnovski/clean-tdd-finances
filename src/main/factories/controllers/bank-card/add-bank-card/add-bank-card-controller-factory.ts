import { AddBankCardController } from "@/presentation/controllers/bank-cards/add-bank-card/add-bank-card-controller"
import { Controller } from "@/presentation/protocols"
import { makeBankCardValidation } from "./add-bank-card-validation-factory"
import { makeDbAddBankCard } from "@/main/factories/use-cases/bank-card/add-bank-card/db-add-bank-card-factory"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/load-bank-account-by-id/load-bank-account-by-id-factory"


export const makeBankCardController = (): Controller => new AddBankCardController(makeDbAddBankCard(), makeBankCardValidation(), makeDbLoadBankAccountById())