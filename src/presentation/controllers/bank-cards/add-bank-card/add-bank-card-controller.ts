import { Controller, HttpResponse } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddBankCard } from "@/domain/use-cases/add-bank-card"
import { Validation } from "@/presentation/protocols/validation"
import { LoadBankAccountById } from "@/domain/use-cases/load-bank-account-by-id"

export class AddBankCardController implements Controller {
  constructor(
    private readonly addBankCard: AddBankCard,
    private readonly validation: Validation,
    private readonly loadBankAccountById: LoadBankAccountById
  ) { }
  async handle(request: AddBankCardController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { number, flag, expiresAt, bankAccountId } = request
      const exists = await this.loadBankAccountById.load(bankAccountId)
      if (!exists) { return notFound('bankAccount') }
      const bankCard = await this.addBankCard.add({ number, flag, expiresAt }, bankAccountId)
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