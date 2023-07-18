import { Validation } from "../../protocols/validation"
import { HttpRequest, HttpResponse, badRequest, ok, serverError, AddBankAccount, Controller } from "./bank-account-controller-protocols"

export class BankAccountController implements Controller {
    constructor(private readonly addBankAccount: AddBankAccount, private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try { 
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { number, currency } = httpRequest.body
            const bankAccount = await this.addBankAccount.add({
                number,
                currency
            })
            return ok(bankAccount)  
        } catch (error: any) {
            return serverError(error)
        }
    }
}