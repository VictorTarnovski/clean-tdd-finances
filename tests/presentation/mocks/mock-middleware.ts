import { HttpResponse, Middleware } from "@/presentation/protocols"
import { ok } from "@/presentation/helpers/http/http-helper"

export const mockMiddleware = (): Middleware => {
  class MiddlewareStub implements Middleware {
      async handle(request: any): Promise<HttpResponse> {
          return ok('ok')
      }
  }
  return new MiddlewareStub()
}