import { BankCardController } from "./bank-card"

import { HttpRequest } from "../../protocols"
import { MissingParamError, badRequest } from "../bank-account/bank-account-protocols"
describe('BankCard Controller', () => {
                    
    test('Should return 400 if no number is provided', async () => {
        const sut = new BankCardController()
        const httpRequest: HttpRequest = {
            body: {
                flag: "any_flag",
                expiresAt: "2027-02-01",
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest( new MissingParamError('number')))
                    
    })

    test('Should return 400 if no flag is provided', async () => {
        const sut = new BankCardController()
        const httpRequest: HttpRequest = {
            body: {
                number: 1,
                expiresAt: "2027-02-01",
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest( new MissingParamError('flag')))
                    
    })
})