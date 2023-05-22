import { MissingParamError } from "../errors/missing-param-error"
import { BadRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if(!httpRequest.body.number) {
            return BadRequest(new MissingParamError('number'))
        }
        if(!httpRequest.body.currency) {
            return BadRequest(new MissingParamError('currency'))
        }
        return {
            statusCode: 200,
            body: { message: 'OK' }
        }
    }
}