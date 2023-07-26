import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken} from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const acessToken = httpRequest.headers?.['x-access-token']
      if(acessToken) {
        const account = await this.loadAccountByToken.load(acessToken, this.role)
        if(account) { return ok({ accountId: account.id })}
      }
      return forbidden(new AccessDeniedError()) 
    } catch (error: any) {
      return serverError(error)
    }
  }
}