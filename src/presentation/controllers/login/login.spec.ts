import { HttpRequest, HttpResponse } from "../../protocols"
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { LoginController } from "./login"
import { EmailValidator } from "../../protocols/email-validator"
import { Authentication } from '../../../domain/use-cases/authentication'

const makeEmailValidatorStub = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeAuthenticationStub = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(email: string, password: string): Promise<string | null> {
            return 'fake_token'
        }
    }
    return new AuthenticationStub()
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
    emailValidatorStub: EmailValidator,
    authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidatorStub()
    const authenticationStub = makeAuthenticationStub()
    const sut = new LoginController(emailValidatorStub, authenticationStub)
    return {
      sut,
      emailValidatorStub,
      authenticationStub
    }
}

describe('Login Controller', () => {
   test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
        body: {
            password: 'any_password'
        }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
   })

   test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
        body: {
            email: 'any_mail@mail.com'
        }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
   })

   test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = makeFakeRequest()
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
   })

   test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest: HttpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
   })

   test('Should return 500 if EmailValidator thorws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
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
    expect(authSpy).toHaveBeenCalledWith('any_mail@mail.com', 'any_password')
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

})