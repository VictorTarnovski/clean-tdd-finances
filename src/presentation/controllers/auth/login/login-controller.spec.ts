import { HttpRequest, HttpResponse } from "@/presentation/protocols"
import { serverError, unauthorized, ok } from '@/presentation/helpers/http/http-helper'
import { Authentication, AuthenticationModel } from '@/domain/use-cases/authentication'
import { Validation } from "@/presentation/protocols/validation"
import { LoginController } from "./login-controller"

const makeAuthenticationStub = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationModel): Promise<string | null> {
            return 'fake_token'
        }
    }
    return new AuthenticationStub()
}

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => (
    {
        body: {
            email: 'any_mail@mail.com',
            password: 'any_password'
        }
    }
)

interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication,
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const authenticationStub = makeAuthenticationStub()
    const validationStub = makeValidationStub()
    const sut = new LoginController(authenticationStub, validationStub)
    return {
      sut,
      authenticationStub,
      validationStub
    }
}

describe('Login Controller', () => {
   test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest: HttpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_mail@mail.com', password: 'any_password'})
   })

   test('Should return 500 if Validation thorws', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        throw mockedError
    })
    const httpRequest: HttpRequest = makeFakeRequest()
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(mockedError))
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

   test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const httpRequest: HttpRequest = makeFakeRequest()
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
   })

   test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = makeFakeRequest()
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ acessToken: 'fake_token'}))
   })

})