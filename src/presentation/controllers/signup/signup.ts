import { HttpRequest, HttpResponse } from "../../protocols"
import { Controller } from "../../protocols"
import { InvalidParamError, MissingParamError, badRequest, ok, serverError } from "../bank-account/bank-account-protocols"

export class SignUpController implements Controller {
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
            return ok('ok')
        } catch (error: any) {
            return serverError(error)
        }

    }
}