import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/add-transaction"
import { LoadBankAccountById } from "@/domain/use-cases/load-bank-account-by-id"

export class AddTransactionController implements Controller {
  constructor(
    private readonly addTransaction: AddTransaction, private readonly validation: Validation, private readonly loadBanKAccountById: LoadBankAccountById
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if(error) {
        return badRequest(error)
      }
      const {
        description,
        value,
        operation,
        bankAccountId,
        cardId
      } = httpRequest.body
      const exists = await this.loadBanKAccountById.load(bankAccountId)
      if(!exists) {
        return notFound('bankAccount')
      }
      await this.addTransaction.add({ description, value, operation, bankAccountId, cardId })
      return ok('ok')
    } catch (error: any) {
      return serverError(error)
    }
  }
}
