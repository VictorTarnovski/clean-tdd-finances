import { Controller, HttpResponse } from "@/presentation/protocols"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadCurrencies } from "@/domain/use-cases"

export class LoadCurrenciesController implements Controller {
  constructor(private readonly loadCurrencies: LoadCurrencies) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const currencies = await this.loadCurrencies.load()
      return ok(currencies)
    } catch (error: any) {
      return serverError(error)
    }
  }
}