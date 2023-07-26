import { Controller, HttpRequest, HttpResponse, LoadBankAccountById } from "./load-bank-account-by-id-controller-protocols"
import { ok, notFound, serverError } from "@/presentation/helpers/http/http-helper"

export class LoadBankAccountByIdController implements Controller {
  constructor(private readonly loadBankAccountById: LoadBankAccountById) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bankAccount = await this.loadBankAccountById.load(httpRequest.params.bankAccountId)
      if (!bankAccount) return notFound('bankAccount')
      return ok(bankAccount)
    } catch (error: any) {
      return serverError(error)
    }
  }
}