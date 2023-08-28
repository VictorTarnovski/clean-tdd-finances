import { Controller, HttpResponse } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { Validation } from "@/presentation/protocols/validation"
import { AddBankCard, LoadBankById, LoadBankAccountById } from "@/domain/use-cases"

export class AddBankCardController implements Controller {
  constructor(
    private readonly addBankCard: AddBankCard,
    private readonly validation: Validation,
    private readonly loadBankAccountById: LoadBankAccountById,
    private readonly loadBankById: LoadBankById
  ) { }
  async handle(request: AddBankCardController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { number, flag, expiresAt, bankAccountId } = request
      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) { return notFound('bankAccount') }
      const bank = await this.loadBankById.load(bankAccount.bankId)
      const bankCard = await this.addBankCard.add({ number, flag, expiresAt: new Date(expiresAt) }, bankAccountId)
      return ok(bankCard)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddBankCardController {
  export type Request = {
    number: number
    flag: string
    expiresAt: string
    bankAccountId: string
  }
}