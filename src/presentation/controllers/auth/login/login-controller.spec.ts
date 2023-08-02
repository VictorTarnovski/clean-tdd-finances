import { HttpResponse } from "@/presentation/protocols"
import { serverError, unauthorized, ok } from '@/presentation/helpers/http/http-helper'
import { Authentication } from '@/domain/use-cases/authentication'
import { Validation } from "@/presentation/protocols/validation"
import { LoginController } from "./login-controller"
import { mockValidation } from "@/presentation/tests"
import { mockAuthentication } from "@/presentation/tests"

const mockRequest = (): LoginController.Request => ({ email: 'any_mail@mail.com', password: 'any_password' })

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
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
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_mail@mail.com', password: 'any_password' })
  })

  test('Should return 500 if Validation thorws', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw mockedError
    })
    const request = mockRequest()
    const httpResponse: HttpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const request = mockRequest()
    await sut.handle(request)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_mail@mail.com', password: 'any_password' })
  })

  test('Should return 500 if Authentication thorws', async () => {
    const { sut, authenticationStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw mockedError
    })
    const request = mockRequest()
    const httpResponse: HttpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const request = mockRequest()
    const httpResponse: HttpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse: HttpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

})