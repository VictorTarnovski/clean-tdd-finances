import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { badRequest, serverError } from "../../helpers/http-helper"
import { MissingParamError } from "../../errors"

export class BankCardController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields: string[] = ['number', 'flag', 'expiresAt']
            for(const field of requiredFields) {   
                if(!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            return { statusCode: 200, body: {}}
        } catch (error: any) {
           return serverError(error) 
        }
    }
}