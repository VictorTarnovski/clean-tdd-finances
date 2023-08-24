import { HttpResponse, Validation } from '@/presentation/protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { ok, badRequest } from '@/presentation/helpers/http/http-helper'
import { AddBankAccount } from '@/domain/use-cases/bank-account/add-bank-account'
import { mockBankAccountModel } from '../../domain/mocks'
import { mockValidation, mockAddBankAccount } from '../mocks'
import { AddBankAccountController } from '@/presentation/controllers/bank-account/add-bank-account-controller'

const mockRequest = () => ({ number: 285992, currency: 'BRL', accountId: 'any_account_id' })

type SutTypes = {
    sut: AddBankAccountController
    addBankAccountStub: AddBankAccount,
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addBankAccountStub = mockAddBankAccount()
    const validationStub = mockValidation()
    const sut = new AddBankAccountController(addBankAccountStub, validationStub)
    return { sut, addBankAccountStub, validationStub }
}

describe('BankAccount Controller', () => {

    test('Should call AddBankAccount with correct values', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const addSpy = jest.spyOn(addBankAccountStub, 'add')
        const request = mockRequest()
        await sut.handle(request)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 285992, currency: 'BRL', balance: 0, cards: [], accountId: 'any_account_id'})
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const request = mockRequest()
        await sut.handle(request)
        expect(validateSpy).toHaveBeenCalledTimes(1)
        expect(validateSpy).toHaveBeenCalledWith(request)
    })

    test('Should return 400 if Validation returns an Error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new MissingParamError('currency')
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
        const request = mockRequest()
        const httpResponse: HttpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(ok(mockBankAccountModel()))
    })

    test('Should return 500 if AddBankAccount throws', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const request = mockRequest()
        jest.spyOn(addBankAccountStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationStub } = makeSut()
        const request = mockRequest()
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {throw new Error()})
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })
})