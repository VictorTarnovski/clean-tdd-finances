import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ok, badRequest, unauthorized, notFound, serverError } from '@/presentation/helpers/http/http-helper'
import { AddBankAccount } from '@/domain/use-cases/bank-account/add-bank-account'
import { LoadBankById } from '@/domain/use-cases'

export class AddBankAccountController implements Controller {
  constructor(
    private readonly addBankAccount: AddBankAccount, 
    private readonly validation: Validation, 
    private readonly loadBankById: LoadBankById
    ) { }
  async handle(request: AddBankAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { number, currency, balance, accountId, bankId } = request
      if (!accountId) { return unauthorized() }
      const bank = await this.loadBankById.load(bankId)
      if(!bank) { return notFound('bank') }
      const accountBalance = balance ? balance : 0
      const bankAccount = await this.addBankAccount.add({
        number,
        currency,
        balance: accountBalance,
        cards: [],
        accountId,
        bankId
      })
      return ok(bankAccount)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddBankAccountController {
  export type Request = {
    number: number
    currency: string
    balance?: number
    accountId: string,
    bankId: string
  }
}