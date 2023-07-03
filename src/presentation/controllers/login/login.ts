import { Controller } from "../../protocols"
import { HttpRequest, HttpResponse } from "../../protocols"
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return badRequest(new MissingParamError('email'))       
    }
}