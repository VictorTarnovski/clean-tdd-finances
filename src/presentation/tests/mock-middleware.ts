import { HttpResponse, Middleware } from "../protocols"
import { ok } from "../helpers/http/http-helper"

export const mockMiddleware = (): Middleware => {
  class MiddlewareStub implements Middleware {
      async handle(request: any): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new MiddlewareStub()
}