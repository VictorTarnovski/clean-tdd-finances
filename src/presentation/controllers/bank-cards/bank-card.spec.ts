import { BankCardController } from "./bank-card"

import { HttpRequest } from "../../protocols"
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'

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

    test('Should return 400 if no expiresAt is provided', async () => {
        const sut = new BankCardController()
        const httpRequest: HttpRequest = {
            body: {
                number: 1,
                flag: 'any_flag'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest( new MissingParamError('expiresAt')))
                    
    })

    test('Should return 400 if card number is not an integer', async () => {
        const sut = new BankCardController()
        const httpRequest = {
            body: { number: '1', flag: 'any_flag', expiresAt: '2027-06-14' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('number'))
    })
})