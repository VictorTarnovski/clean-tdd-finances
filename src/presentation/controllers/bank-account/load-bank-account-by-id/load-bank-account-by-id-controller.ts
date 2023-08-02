import { forbidden, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AccessDeniedError } from "@/presentation/errors"
import { LoadBankAccountById} from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadAccountById } from "@/domain/use-cases/account/load-account-by-id"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBankAccountByIdController implements Controller {
  constructor(private readonly loadBankAccountById: LoadBankAccountById, private readonly loadAccountById: LoadAccountById ) { }
  async handle(request: LoadBankAccountByIdController.Request): Promise<HttpResponse> {
    try {
      const { bankAccountId, accountId } = request
      const account = await this.loadAccountById.load(accountId!)
      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) return notFound('bankAccount')
      if(account?.role !== 'admin' && bankAccount.accountId !== account!.id) {
        return forbidden(new AccessDeniedError())
      }
      return ok(bankAccount)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoadBankAccountByIdController {
  export type Request  = {
    bankAccountId: string
    accountId: string
  }
}