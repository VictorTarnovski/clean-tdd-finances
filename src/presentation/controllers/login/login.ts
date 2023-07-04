import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EmailValidator } from "../../protocols/email-validator"

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest.body
        if(!email) {
            return badRequest(new MissingParamError('email'))
        }
        if(!password) {
            return badRequest(new MissingParamError('password'))
        }
        const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
        if(!isValidEmail) {
            return badRequest(new InvalidParamError('email'))
        }
        return ok('ok')
        } catch (error: any) {
            return serverError(error)
        }
        
    }
}