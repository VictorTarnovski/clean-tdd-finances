import { constrainedMemory } from "process"
import { HttpRequest, HttpResponse } from "../../protocols"
import { Controller } from "../../protocols"
import { InvalidParamError, MissingParamError, badRequest, ok, serverError } from "../bank-account/bank-account-protocols"
import { EmailValidator } from "../../protocols/email-validator"

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {   
            const requiredFields: string[] = [ 'name', 'email', 'password', 'passwordConfirmation' ]
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { name, email, password, passwordConfirmation } = httpRequest.body
            if(password !== passwordConfirmation) return badRequest(new InvalidParamError(password))
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) return badRequest(new InvalidParamError('email'))
            return ok('ok')
        } catch (error: any) {
            return serverError(error)
        }

    }
}