import { Controller, HttpRequest, HttpResponse, LoadBankAccountById, AccessDeniedError, LoadAccountById } from "./load-bank-account-by-id-controller-protocols"
import { ok, notFound, serverError, forbidden } from "@/presentation/helpers/http/http-helper"

export class LoadBankAccountByIdController implements Controller {
  constructor(private readonly loadBankAccountById: LoadBankAccountById, private readonly loadAccountById: LoadAccountById) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { bankAccountId } = httpRequest.params
      const { accountId } = httpRequest
      const account = await this.loadAccountById.load(accountId!)
      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) return notFound('bankAccount')
      if(bankAccount.accountId !== accountId) {
        return forbidden(new AccessDeniedError())
      }
      return ok(bankAccount)
    } catch (error: any) {
      return serverError(error)
    }
  }
}