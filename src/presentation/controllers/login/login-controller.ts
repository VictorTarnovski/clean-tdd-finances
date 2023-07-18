import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
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
         const requiredFields: string[] = ['email', 'password']
        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        const { email, password } = httpRequest.body
        const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
        if(!isValidEmail) {
            return badRequest(new InvalidParamError('email'))
        }
        const acessToken = await this.authentication.auth({email, password})
        if(!acessToken) {
            return unauthorized()
        }
        return ok({acessToken: acessToken})
        } catch (error: any) {
            return serverError(error)
        }
        
    }
}