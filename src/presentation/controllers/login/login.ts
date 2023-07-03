import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { EmailValidator } from "../../protocols/email-validator"

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if(!httpRequest.body.email) {
            return badRequest(new MissingParamError('email'))
        }
        if(!httpRequest.body.password) {
            return badRequest(new MissingParamError('password'))
        }
        const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
        return ok('ok')
    }
}