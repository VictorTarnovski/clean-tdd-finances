import { HttpRequest, HttpResponse } from "../../protocols"
import { Controller } from "../../protocols"
import { InvalidParamError, badRequest, ok, serverError } from "../bank-account/bank-account-protocols"
import { EmailValidator } from "../../protocols/email-validator"
import { AddAccount } from "../../../domain/use-cases/add-account"
import { Validation } from "../../protocols/validation"

export class SignUpController implements Controller {
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor (addAccount: AddAccount, validation: Validation) {
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {   
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = httpRequest.body
            const account = await this.addAccount.add({ name, email, password })
            return ok(account)
        } catch (error: any) {
            return serverError(error)
        }

    }
}