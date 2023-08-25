import { Controller, HttpResponse } from "@/presentation/protocols"
import { ok, notFound, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadBankById } from "@/domain/use-cases"

export class LoadBankByIdController implements Controller {
  constructor(private readonly loadBankById: LoadBankById) { }
  async handle(request: LoadBankByIdController.Request): Promise<HttpResponse> {
    try {
      const { bankId } = request
      const bank = await this.loadBankById.load(bankId)
      if(!bank) {
        return notFound('bank')
      }
      return ok(bank)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoadBankByIdController {
  export type Request  = {
    bankId: string
  }
}