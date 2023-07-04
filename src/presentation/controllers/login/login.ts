import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EmailValidator } from "../../protocols/email-validator"
import { Authentication } from "../../../domain/use-cases/authentication"

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication
    constructor(emailValidator: EmailValidator, authentication: Authentication) {
        this.emailValidator = emailValidator
        this.authentication = authentication
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
        await this.authentication.auth(email, password)
        return ok('ok')
        } catch (error: any) {
            return serverError(error)
        }
        
    }
}