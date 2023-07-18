import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { badRequest, ok, serverError } from "../../helpers/http/http-helper"
import { MissingParamError, InvalidParamError } from "../../errors"
import { AddBankCard } from "../../../domain/use-cases/add-bank-card"
import { Validation } from "../../protocols/validation"

export class BankCardController implements Controller {
    private readonly addBankCard: AddBankCard
    private readonly validation: Validation
    constructor(addBankCard: AddBankCard, validation: Validation) {
        this.addBankCard = addBankCard
        this.validation = validation
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error) {
                return badRequest(error)
            }
            const { number, flag, expiresAt } = httpRequest.body
            const { bankAccountId } = httpRequest.params
            const bankCard = await this.addBankCard.add({ number, flag, expiresAt }, bankAccountId)
            return ok(bankCard)
        } catch (error: any) {
           return serverError(error) 
        }
    }
}
