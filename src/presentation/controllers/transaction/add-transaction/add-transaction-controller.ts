import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/add-transaction"

export class AddTransactionController implements Controller {
  constructor(
    private readonly addTransaction: AddTransaction,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        description,
        value,
        operation,
        bankAccountId,
        cardId
      } = httpRequest.body
      await this.addTransaction.add({ description, value, operation, bankAccountId, cardId})
      return ok('ok')
    } catch (error: any) {
      return serverError(error)
    }
  }
}
