import { Validation } from "@/presentation/protocols/validation"
import { HttpRequest, HttpResponse, badRequest, ok, serverError, AddBankAccount, Controller, unauthorized } from "./add-bank-account-controller-protocols"

export class AddBankAccountController implements Controller {
    constructor(private readonly addBankAccount: AddBankAccount, private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try { 
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { number, currency, balance } = httpRequest.body
            const { accountId } = httpRequest
            if(!accountId) { return unauthorized() }
            const accountBalance = balance ? balance : 0
            const bankAccount = await this.addBankAccount.add({
                number,
                currency,
                balance: accountBalance,
                cards: [],
                accountId
            })
            return ok(bankAccount)  
        } catch (error: any) {
            return serverError(error)
        }
    }
}