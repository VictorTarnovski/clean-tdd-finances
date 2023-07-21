import { MissingParamError, EmailInUseError } from "../../errors"
import { badRequest, ok, serverError, forbidden } from "../../helpers/http/http-helper"
import { SignUpController } from "./signup-controller"
import { AccountModel } from "../../../domain/models/account"
import { AddAccountModel } from "../../../domain/use-cases/add-account"
import { AddAccount } from '../../../domain/use-cases/add-account'
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { Validation } from "../../../presentation/protocols"
import { Authentication, AuthenticationModel } from "../../../domain/use-cases/authentication"

const makeAddAccountStub = () => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel>  {
            const fakeAccount = {
                id: 'valid_id',
                name: 'any_name',
                email: 'any_mail@mail.com',
                password: 'any_password'
            }
            return fakeAccount
        }
    }
    return new AddAccountStub()
}

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

const makeAuthenticationStub = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationModel): Promise<string | null> {
            return 'fake_token'
        }
    }
    return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => (
    {
        body: {
            name: "any_name",
            email: 'any_mail@mail.com',
            password: 'any_password',
            passwordConfirmation: 'any_password'
        }
    }
)

interface SutTypes {
    sut: SignUpController
    addAccountStub: AddAccount,
    validationStub: Validation,
    authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccountStub()
    const validationStub = makeValidationStub()
    const authenticationStub = makeAuthenticationStub()
    const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
    return { sut, addAccountStub, validationStub, authenticationStub }
}

describe('SignUp Controller', () => {

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            email: 'any_mail@mail.com',
            name: 'any_name',
            password: 'any_password'
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        const mockedError = new Error()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw mockedError })
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(mockedError))
    })

    test('Should return 403 if AddAccount returns null', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => { return null })
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(ok({ accessToken: 'fake_token' }))
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toBeCalledWith(httpRequest.body)
    })

    test('Should return 400 if validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new MissingParamError('any_field')
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(mockedError)
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(authSpy).toHaveBeenCalledWith({ email: 'any_mail@mail.com', password: 'any_password'})
    })

    test('Should return 500 if Authentication thorws', async () => {
        const { sut, authenticationStub } = makeSut()
        const mockedError = new Error('mocked error')
        jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
            throw mockedError
        })
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse: HttpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(mockedError))
    })
})