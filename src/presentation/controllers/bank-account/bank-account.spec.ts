import { BankAccountController } from './bank-account'
import { MissingParamError, InvalidParamError, BankAccountModel, AddBankAccount, AddBankAccountModel } from './bank-account-protocols'

describe('BankAccount Controller', () => {

    const makeAddBankAccontStub = () => {
        class addAccountStub implements AddBankAccount {
            async add(account: AddBankAccountModel): Promise<BankAccountModel> {
                const fakeAccount = { id: 'valid_id', number: 1, currency: 'USD'}
                return fakeAccount
            }
        }
        return new addAccountStub()
    }

    const makeSut= () => {
        const addBankAccountStub = makeAddBankAccontStub()
        const sut = new BankAccountController(addBankAccountStub)
        return { sut, addBankAccountStub }
    }

    test('Should return 400 if no number is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { currency: 'USD' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('number'))
    })

    test('Should return 400 if no currency is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: 1 }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('currency'))
    })

    test('Should return 400 if account number is not an integer', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: '1', currency: 'USD' }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('number'))
    })

    test('Should return 400 if currency is not a string', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { number: 1, currency: { name: 'USD' } }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('currency'))
    })

    test('Should call AddBankAccount with correct values', () => {
        const { sut, addBankAccountStub } = makeSut()
        const addSpy = jest.spyOn(addBankAccountStub, 'add')
        const httpRequest = {
            body: { number: 1, currency: 'USD' }
        }
        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy).toHaveBeenCalledWith({ number: 1, currency: 'USD' })
    })
})