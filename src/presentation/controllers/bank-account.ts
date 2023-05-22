import { MissingParamError } from "../errors/missing-param-error"
import { BadRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields: string[] = ['number', 'currency']
        for(const field of requiredFields) {   
            if(!httpRequest.body[field]) {
                return BadRequest(new MissingParamError(field))
            }
        }
        return {
            statusCode: 200,
            body: { message: 'OK' }
        }
    }
}