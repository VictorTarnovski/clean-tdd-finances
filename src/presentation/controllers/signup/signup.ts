import { HttpRequest, HttpResponse } from "../../protocols"
import { Controller } from "../../protocols"
import { InvalidParamError, MissingParamError, badRequest, ok, serverError } from "../bank-account/bank-account-protocols"
import { EmailValidator } from "../../protocols/email-validator"
import { AddAccount } from "../../../domain/use-cases/add-account"
import { Validation } from "../../helpers/validators/validation"

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor(emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {   
            this.validation.validate(httpRequest.body)
            const requiredFields: string[] = [ 'name', 'email', 'password', 'passwordConfirmation' ]
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { name, email, password, passwordConfirmation } = httpRequest.body
            if(password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) return badRequest(new InvalidParamError('email'))
            const account = await this.addAccount.add({ name, email, password })
            return ok(account)
        } catch (error: any) {
            return serverError(error)
        }

    }
}