import { BankCardController } from "./bank-card"

import { HttpRequest } from "../../protocols"
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { AddBankCard, AddBankCardModel } from '../../../domain/use-cases/add-bank-card'
import { BankCardModel } from "../../../domain/models/bank-card"

const makeAddBankCardStub = () => {
    class AddBankCardStub implements AddBankCard {
        async add(bankCard: AddBankCardModel): Promise<BankCardModel> {
            return { id: 'valid_id', number: 1, flag: 'valid_flag', expiresAt: '2023-06-14'}
        }
    }
    return new AddBankCardStub()
}
interface SutTypes {
    sut: BankCardController,
    addBankCardStub: AddBankCard
}

const makeSut = (): SutTypes => {
    const addBankCardStub = makeAddBankCardStub()
    const sut = new BankCardController(addBankCardStub)
    return {
        sut,
        addBankCardStub
    }
}

describe('BankCard Controller', () => {
                    
    test('Should return 400 if no number is provided', async () => {
        const { sut } = makeSut()
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
        const { sut } = makeSut()
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
        const { sut } = makeSut()
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
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: '1', flag: 'any_flag', expiresAt: '2027-06-14' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.body).toEqual(new InvalidParamError('number'))
    })

    test('Should return 400 if flag is not a string', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: 1, flag: { name: 'any_flag' }, expiresAt: '2027-06-14' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.body).toEqual(new InvalidParamError('flag'))
    })

    test('Should return 400 if expiresAt is not correctly passed', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: 1, flag: 'any_flag', expiresAt: 20270614 }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.body).toEqual(new InvalidParamError('expiresAt'))
    })

    test('Should call AddBankCard with correct values', () => {
        const { sut, addBankCardStub } = makeSut()
        const addSpy = jest.spyOn(addBankCardStub, 'add')
        const httpRequest = {
            body: { number: 1, flag: 'any_flag', expiresAt: '2023-06-14' }
        }
        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 1, flag: 'any_flag', expiresAt: '2023-06-14' })
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: 1, flag: 'valid_flag', expiresAt: '2023-06-14' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({ id: 'valid_id', number: 1, flag: 'valid_flag', expiresAt: '2023-06-14' })
    })

    test('Should return 500 if AddBankCard throws', async () => {
        const { sut, addBankCardStub } = makeSut()
        const httpRequest = {
            body: { number: 1, flag: 'valid_flag', expiresAt: '2023-06-14' }
        }
        jest.spyOn(addBankCardStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })
})