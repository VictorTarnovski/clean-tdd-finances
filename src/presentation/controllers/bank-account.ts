import { MissingParamError } from "../errors/missing-param-error"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if(!httpRequest.body.number) {
            return { 
                statusCode: 400, 
                body: new MissingParamError('number') 
            }
        }
        if(!httpRequest.body.currency) {
            return { 
                statusCode: 400, 
                body: new MissingParamError('currency') 
            }
        }
        return {
            statusCode: 200,
            body: { message: 'OK' }
        }
    }
}