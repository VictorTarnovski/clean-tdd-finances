import { Controller, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadTransactionsByBankAccount } from "@/domain/use-cases"

export class LoadTransactionsByBankAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadBankAccountById: LoadBankAccountById,
    private readonly loadTransactionsByBankAccount: LoadTransactionsByBankAccount
  ) { }
  async handle(request: LoadTransactionsByBankAccountController.Request): Promise<HttpResponse> {
    try {

      const error = this.validation.validate(request)
      if (error) { return badRequest(error) }

      const { bankAccountId } = request

      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) { return notFound('bankAccount') }

      const transactions = await this.loadTransactionsByBankAccount.load(bankAccountId)
      return ok(transactions)

    } catch (error: any) {

      return serverError(error)

    }
  }
}

export namespace LoadTransactionsByBankAccountController {
  export type Request = {
    bankAccountId: string
  }
}