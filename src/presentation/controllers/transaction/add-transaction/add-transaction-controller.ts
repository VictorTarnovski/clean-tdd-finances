import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/transaction/add-transaction"
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"

export class AddTransactionController implements Controller {
  constructor(
    private readonly addTransaction: AddTransaction,
    private readonly validation: Validation,
    private readonly loadBankAccountById: LoadBankAccountById,
    private readonly loadBankCardById: LoadBankCardById
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        description,
        value,
        operation,
        bankAccountId,
        bankCardId
      } = httpRequest.body
      const bankAccountExists = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccountExists) {
        return notFound('bankAccount')
      }
      if(bankCardId) {
        const bankCardExists = await this.loadBankCardById.load(bankCardId, bankAccountId)
        if(!bankCardExists) {
          return notFound('bankCard')
        }
      }
      const transaction = await this.addTransaction.add({ description, value, operation, bankAccountId, bankCardId })
      return ok(transaction)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
