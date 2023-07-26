import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"
import { badRequest, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddBankCard } from "@/domain/use-cases/add-bank-card"
import { Validation } from "@/presentation/protocols/validation"

export class AddBankCardController implements Controller {
    constructor(private readonly addBankCard: AddBankCard, private readonly validation: Validation) {}
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
