import { LoadBankAccountByIdController } from "../../../../../presentation/controllers/bank-account/load-bank-account-by-id/load-bank-account-by-id-controller"
import { Controller } from "../../../../../presentation/protocols"
import { makeDbLoadBankAccountById } from "../../../use-cases/bank-account/load-bank-account-by-id/load-bank-account-by-id"

export const makeLoadBankAccountByIdController = (): Controller => new LoadBankAccountByIdController(makeDbLoadBankAccountById())