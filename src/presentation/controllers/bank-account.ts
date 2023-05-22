import { MissingParamError, InvalidParamError, ServerError } from "../errors"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    handle(httpRequest: HttpRequest): HttpResponse {
        try { 
            const requiredFields: string[] = ['number', 'currency']
            for(const field of requiredFields) {   
                if(!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            if(typeof httpRequest.body.number !== 'number') return badRequest(new InvalidParamError('number'))
            if(typeof httpRequest.body.currency !== 'string') return badRequest(new InvalidParamError('currency'))
            return {
                statusCode: 200,
                body: { message: 'OK' }
            }   
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            }
        }
    }
}