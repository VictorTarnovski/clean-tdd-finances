import { Validation } from '@/presentation/protocols'
import { AddBankAccountController } from './add-bank-account-controller'
import { MissingParamError, ServerError, AddBankAccount, HttpRequest, HttpResponse, badRequest, ok } from './add-bank-account-controller-protocols'
import { mockBankAccountModel } from '@/domain/tests'
import { mockValidation } from '@/presentation/tests'
import { mockAddBankAccount } from '@/presentation/tests'

const mockRequest = (): HttpRequest => ({ accountId: 'any_account_id', body: { number: 285992, currency: 'BRL' } })

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
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 285992, currency: 'BRL', balance: 0, cards: [], accountId: 'any_account_id'})
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledTimes(1)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validation returns an Error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new MissingParamError('currency')
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
        const httpRequest = mockRequest()
        const httpResponse: HttpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = mockRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(ok(mockBankAccountModel()))
    })

    test('Should return 500 if AddBankAccount throws', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const httpRequest = mockRequest()
        jest.spyOn(addBankAccountStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationStub } = makeSut()
        const httpRequest = mockRequest()
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {throw new Error()})
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })
})