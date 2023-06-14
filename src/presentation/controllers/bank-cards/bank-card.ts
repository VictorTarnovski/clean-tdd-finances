import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { badRequest, ok, serverError } from "../../helpers/http-helper"
import { MissingParamError, InvalidParamError } from "../../errors"
import { AddBankCard } from "../../../domain/use-cases/add-bank-card"

export class BankCardController implements Controller {
    addBankCard: AddBankCard
    constructor(addBankCard: AddBankCard) {
        this.addBankCard = addBankCard
    }
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
            if(expiresAt.length !== 10) {
                return badRequest(new InvalidParamError('expiresAt'))
            }
            const bankCard = this.addBankCard.add({ number, flag, expiresAt })
            return ok(bankCard)
        } catch (error: any) {
           return serverError(error) 
        }
    }
}
