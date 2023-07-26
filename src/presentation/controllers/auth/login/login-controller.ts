import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Authentication } from "@/domain/use-cases/authentication"

export class LoginController implements Controller {
    constructor(private readonly authentication: Authentication, private readonly validation: Validation) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { email, password } = httpRequest.body
            const acessToken = await this.authentication.auth({ email, password })
            if (!acessToken) {
                return unauthorized()
            }
            return ok({ acessToken: acessToken })
        } catch (error: any) {
            return serverError(error)
        }

    }
}