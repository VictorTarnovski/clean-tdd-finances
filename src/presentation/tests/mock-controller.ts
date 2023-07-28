import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { ok } from "../helpers/http/http-helper"

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new ControllerStub()
}