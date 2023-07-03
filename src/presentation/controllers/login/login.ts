import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if(!httpRequest.body.email) {
            return badRequest(new MissingParamError('email'))
        }
        if(!httpRequest.body.password) {
            return badRequest(new MissingParamError('password'))
        }
        else {
            return ok('ok')
        }
    }
}