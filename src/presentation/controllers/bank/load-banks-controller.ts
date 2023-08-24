import { Controller, HttpResponse } from "@/presentation/protocols"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadBanks } from "@/domain/use-cases"

export class LoadBanksController implements Controller {
  constructor(private readonly loadBanks: LoadBanks) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const banks = await this.loadBanks.load()
      return ok(banks)
    } catch (error: any) {
      return serverError(error)
    }
  }
}