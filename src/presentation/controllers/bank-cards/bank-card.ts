import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { badRequest, serverError } from "../../helpers/http-helper"
import { MissingParamError, InvalidParamError } from "../../errors"

export class BankCardController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields: string[] = ['number', 'flag', 'expiresAt']
            for(const field of requiredFields) {   
                if(!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { number, flag, expiresAt } = httpRequest.body
            if(typeof number !== 'number') { return badRequest(new InvalidParamError('number'))}
            if(typeof flag !== 'string') { return badRequest(new InvalidParamError('flag'))}
            return { statusCode: 200, body: { number, flag, expiresAt }}
        } catch (error: any) {
           return serverError(error) 
        }
    }
}