import { HttpRequest, HttpResponse } from "@/presentation/protocols"
import { Controller } from "@/presentation/protocols"
import { EmailInUseError } from "@/presentation/errors"
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddAccount } from "@/domain/use-cases/account/add-account"
import { Validation } from "@/presentation/protocols/validation"
import { Authentication } from "@/domain/use-cases/authentication/authentication"

export class SignUpController implements Controller {
    constructor (private readonly addAccount: AddAccount, private readonly validation: Validation, private readonly authentication: Authentication) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {   
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = httpRequest.body
            const account = await this.addAccount.add({ name, email, password })
            if (!account) {
                return forbidden(new EmailInUseError())
            }
            const accessToken = await this.authentication.auth({ email, password })
            return ok({ accessToken: accessToken })
        } catch (error: any) {
            return serverError(error)
        }

    }
}