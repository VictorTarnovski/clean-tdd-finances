import { Controller, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Authentication } from "@/domain/use-cases/authentication"

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication, private readonly validation: Validation) { }
  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken: accessToken })
    } catch (error: any) {
      return serverError(error)
    }

  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}