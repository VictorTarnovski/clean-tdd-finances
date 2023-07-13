import { Validation } from '../../protocols/validation'
import { BankAccountController } from './bank-account'
import { MissingParamError, ServerError, BankAccountModel, AddBankAccount, AddBankAccountModel, HttpRequest, HttpResponse, badRequest } from './bank-account-protocols'

const makeAddBankAccontStub = (): AddBankAccount => {
    class addAccountStub implements AddBankAccount {
        async add(account: AddBankAccountModel): Promise<BankAccountModel> {
            const fakeAccount = { id: 'valid_id', number: 1, currency: 'USD', cards: []}
            return fakeAccount
        }
    }
    return new addAccountStub()
}

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
    body: { number: 1, currency: 'USD' }
})
interface SutTypes {
    sut: BankAccountController
    addBankAccountStub: AddBankAccount,
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addBankAccountStub = makeAddBankAccontStub()
    const validationStub = makeValidationStub()
    const sut = new BankAccountController(addBankAccountStub, validationStub)
    return { sut, addBankAccountStub, validationStub }
}

describe('BankAccount Controller', () => {

    test('Should call AddBankAccount with correct values', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const addSpy = jest.spyOn(addBankAccountStub, 'add')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 1, currency: 'USD' })
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledTimes(1)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validation returns an Error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new MissingParamError('currency')
        const validateSpy = jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
        const httpRequest = makeFakeRequest()
        const httpResponse: HttpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({ id: 'valid_id', number: 1, currency: 'USD', cards: []})
    })

    test('Should return 500 if AddBankAccount throws', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const httpRequest = makeFakeRequest()
        jest.spyOn(addBankAccountStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationStub } = makeSut()
        const httpRequest = makeFakeRequest()
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {throw new Error()})
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
    })
})