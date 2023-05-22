import { BankAccountController } from './bank-account'

describe('BankAccount Controller', () => {

    test('Should return 400 if no number is provided', () => {
        const sut = new BankAccountController()
        const httpRequest = {
            body: { }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Missing param: number'))
    })

    test('Should return 400 if no currency is provided', () => {
        const sut = new BankAccountController()
        const httpRequest = {
            body: { number: 1 }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Missing param: currency'))
    })
})