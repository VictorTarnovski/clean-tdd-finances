import { HttpRequest, HttpResponse, Middleware } from "../protocols"
import { ok } from "../helpers/http/http-helper"

export const mockMiddleware = (): Middleware => {
  class MiddlewareStub implements Middleware {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new MiddlewareStub()
}