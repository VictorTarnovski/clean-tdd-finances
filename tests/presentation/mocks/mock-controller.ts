import { Controller, HttpResponse } from "@/presentation/protocols"
import { ok } from "@/presentation/helpers/http/http-helper"

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
      async handle(request: any): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new ControllerStub()
}