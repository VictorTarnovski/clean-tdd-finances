import { Controller, HttpResponse } from "@/presentation/protocols"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadBankById } from "@/domain/use-cases"

export class LoadBankByIdController implements Controller {
  constructor(private readonly loadBankById: LoadBankById) { }
  async handle(request: LoadBankByIdController.Request): Promise<HttpResponse> {
    try {
      const { bankId } = request
      await this.loadBankById.load(bankId)
      return ok('')
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