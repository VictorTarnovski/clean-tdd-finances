import { AddBankAccountController } from "@/presentation/controllers/bank-cards/add-bank-account-controller"
import { Controller } from "@/presentation/protocols"
import { makeDbAddBankAccount } from "@/main/factories/use-cases/bank-account/db-add-bank-account-factory"
import { makeAddBankAccountValidation } from "./add-bank-account-validation-factory"

export const makeAddBankAccountController = async (): Promise<Controller> => {
  const validation = await makeAddBankAccountValidation()
  return new AddBankAccountController(makeDbAddBankAccount(), validation)
}