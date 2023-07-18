import { BankCardController } from "./bank-card-controller"
import { HttpRequest } from "../../protocols"
import { badRequest, serverError } from '../../helpers/http/http-helper'
import { ServerError } from '../../errors'
import { AddBankCard, AddBankCardModel } from '../../../domain/use-cases/add-bank-card'
import { BankCardModel } from "../../../domain/models/bank-card"
import { Validation } from "../../protocols/validation"

const makeAddBankCardStub = () => {
    class AddBankCardStub implements AddBankCard {
        async add(bankCard: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
            return { id: 'valid_id', number: 1, flag: 'valid_flag', expiresAt: '06/14/2023'}
        }
    }
    return new AddBankCardStub()
}

const makeValidationStub = () => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
    params: { bankAccountId: 'valid_id'},
    body: { number: 1, flag: 'any_flag', expiresAt: '06/14/2023' }
})

interface SutTypes {
    sut: BankCardController,
    addBankCardStub: AddBankCard,
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addBankCardStub = makeAddBankCardStub()
    const validationStub = makeValidationStub()
    const sut = new BankCardController(addBankCardStub, validationStub)
    return {
        sut,
        addBankCardStub,
        validationStub
    }
}

describe('BankCard Controller', () => {

    test('Should call AddBankCard with correct values', () => {
        const { sut, addBankCardStub } = makeSut()
        const addSpy = jest.spyOn(addBankCardStub, 'add')
        const httpRequest = makeFakeRequest()
        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 1, flag: 'any_flag', expiresAt: '06/14/2023' }, 'valid_id')
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({ id: 'valid_id', number: 1, flag: 'valid_flag', expiresAt: '06/14/2023' })
    })

    test('Should return 500 if AddBankCard throws', async () => {
        const { sut, addBankCardStub } = makeSut()
        const httpRequest = makeFakeRequest()
        jest.spyOn(addBankCardStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })

    test('Should call Validation with correct values', () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledTimes(1)
        expect(validateSpy).toHaveBeenCalledWith({ number: 1, flag: 'any_flag', expiresAt: '06/14/2023' })
    })

    test('Should return an Error Validation returns an Error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new Error() 
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new Error()
        const httpRequest = makeFakeRequest()
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw mockedError })
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(mockedError))
    })
})