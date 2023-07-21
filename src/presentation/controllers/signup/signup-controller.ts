import { HttpRequest, HttpResponse } from "../../protocols"
import { Controller } from "../../protocols"
import { badRequest, ok, serverError } from "../bank-account/bank-account-controller-protocols"
import { AddAccount } from "../../../domain/use-cases/add-account"
import { Validation } from "../../protocols/validation"
import { Authentication } from "../../../domain/use-cases/authentication"

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
            if (account) {
                await this.authentication.auth({ email: account.email, password: account.password })
            }
            return ok(account)
        } catch (error: any) {
            return serverError(error)
        }

    }
}