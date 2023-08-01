import { AddTransactionController } from "@/presentation/controllers/transaction/add-transaction/add-transaction-controller"
import { Controller } from "@/presentation/protocols"
import { makeAddTransactionValidation } from "./add-transaction-validation-factory"
import { makeDbLoadBankAccountById } from "@/main/factories/use-cases/bank-account/load-bank-account-by-id/db-load-bank-account-by-id-factory"
import { makeDbAddTransaction } from "@/main/factories/use-cases/transaction/add-transaction/db-add-transaction-factory"
import { makeDbLoadBankCardById } from "@/main/factories/use-cases/bank-card/load-bank-card-by-id/db-load-bank-card-by-id-factory"

export const makeAddTransactionController = (): Controller => new AddTransactionController(makeDbAddTransaction(), makeAddTransactionValidation(), makeDbLoadBankAccountById(), makeDbLoadBankCardById())