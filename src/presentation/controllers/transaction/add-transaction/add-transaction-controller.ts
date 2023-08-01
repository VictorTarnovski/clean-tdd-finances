import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/add-transaction"

export class AddTransactionController implements Controller {
  constructor(
    private readonly addTransaction: AddTransaction, private readonly validation: Validation
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
      await this.addTransaction.add({ description, value, operation, bankAccountId, cardId})
      return ok('ok')
    } catch (error: any) {
      return serverError(error)
    }
  }
}
