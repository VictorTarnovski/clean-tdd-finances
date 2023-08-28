import { AddBankCardController } from "@/presentation/controllers/bank-cards/add-bank-card-controller"
import { Controller } from "@/presentation/protocols"
import { makeBankCardValidation } from "./add-bank-card-validation-factory"
import { makeDbAddBankCard } from "@/main/factories/use-cases/bank-card/db-add-bank-card-factory"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/db-load-bank-account-by-id-factory"
import { makeDbLoadBankById } from "@/main/factories/use-cases/bank/db-load-bank-by-id-factory"


export const makeBankCardController = (): Controller => {
  return new AddBankCardController(
    makeDbAddBankCard(), 
    makeBankCardValidation(), 
    makeDbLoadBankAccountById(), 
    makeDbLoadBankById()
  )
}