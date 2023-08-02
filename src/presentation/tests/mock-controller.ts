import { Controller, HttpResponse } from "../protocols"
import { ok } from "../helpers/http/http-helper"

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
      async handle(request: any): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new ControllerStub()
}