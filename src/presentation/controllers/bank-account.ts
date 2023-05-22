import { InvalidParamError } from "../errors/invalid-param-erros"
import { MissingParamError } from "../errors/missing-param-error"
import { ServerError } from "../errors/server-error"
import { BadRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    handle(httpRequest: HttpRequest): HttpResponse {
        try { 
            const requiredFields: string[] = ['number', 'currency']
            for(const field of requiredFields) {   
                if(!httpRequest.body[field]) {
                    return BadRequest(new MissingParamError(field))
                }
            }
            if(typeof httpRequest.body.number !== 'number') return BadRequest(new InvalidParamError('number'))
            if(typeof httpRequest.body.currency !== 'string') return BadRequest(new InvalidParamError('currency'))
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