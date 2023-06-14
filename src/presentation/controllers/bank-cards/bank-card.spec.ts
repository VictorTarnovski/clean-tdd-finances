import { BankCardController } from "./bank-card"

import { HttpRequest } from "../../protocols"
describe('BankCard Controller', () => {
                    
    test('Should return 400 if no number if provided', async () => {
        const sut = new BankCardController()
        const httpRequest: HttpRequest = {
            body: {
                flag: "any_flag",
                expiresAt: "2027-02-01",
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
                    
    })
})