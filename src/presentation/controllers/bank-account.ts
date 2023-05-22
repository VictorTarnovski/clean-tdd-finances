import { AddBankAccount } from "../../domain/use-cases/add-bank-account"
import { MissingParamError, InvalidParamError, ServerError } from "../errors"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class BankAccountController {
    addBankAccount: AddBankAccount
    constructor(addBankAccount: AddBankAccount) {
        this.addBankAccount = addBankAccount
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try { 
            const requiredFields: string[] = ['number', 'currency']
            for(const field of requiredFields) {   
                if(!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { number, currency } = httpRequest.body
            if(typeof number !== 'number') return badRequest(new InvalidParamError('number'))
            if(typeof currency !== 'string') return badRequest(new InvalidParamError('currency'))
            const bankAccount = await this.addBankAccount.add(httpRequest.body)
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