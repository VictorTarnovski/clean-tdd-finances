import { Controller } from "@/presentation/protocols"
import { makeLoadTransactionsByBankAccountValidation } from "./load-transactions-by-bank-account-validation-factory"
import { LoadTransactionsByBankAccountController } from "@/presentation/controllers/transaction/load-transactions-by-bank-account-controller"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/db-load-bank-account-by-id-factory"
import { makeDbAddTransaction } from "@/main/factories/use-cases/transaction/db-add-transaction-factory"
import { makeDbLoadTransactionsByBankAccount } from "@/main/factories/use-cases/transaction/db-load-transactions-by-bank-account-factory"

export const makeLoadTransactionsByBankAccountController = (): Controller => {
  const validation = makeLoadTransactionsByBankAccountValidation()
  const loadBankAccountById = makeDbLoadBankAccountById()
  const loadTransactionsByBankAccount = makeDbLoadTransactionsByBankAccount()
  return new LoadTransactionsByBankAccountController(
    validation,
    loadBankAccountById,
    loadTransactionsByBankAccount
  )
}