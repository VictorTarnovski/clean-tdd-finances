import { HttpRequest, HttpResponse, badRequest, MissingParamError, InvalidParamError, ServerError, AddBankAccount } from "./bank-account-protocols"

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
            const bankAccount = await this.addBankAccount.add({
                number,
                currency
            })
            return {
                statusCode: 200,
                body: bankAccount
            }   
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            }
        }
    }
}