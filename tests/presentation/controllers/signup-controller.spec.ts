import { MissingParamError, EmailInUseError } from "@/presentation/errors"
import { badRequest, ok, serverError, forbidden } from "@/presentation/helpers/http/http-helper"
import { SignUpController } from "@/presentation/controllers/auth/signup-controller"
import { AddAccount } from '@/domain/use-cases/account/add-account'
import { HttpResponse, Validation } from "@/presentation/protocols"
import { Authentication } from "@/domain/use-cases/authentication/authentication"
import { mockValidation, mockAuthentication, mockAddAccount  } from "../mocks"

const mockRequest = (): SignUpController.Request => ({
  name: "any_name",
  email: 'any_mail@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount,
  validationStub: Validation,
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return { sut, addAccountStub, validationStub, authenticationStub }
}

describe('SignUp Controller', () => {

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      name: 'any_name',
      password: 'any_password',
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    const mockedError = new Error()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw mockedError })
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => { return null })
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toBeCalledWith(request)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new MissingParamError('any_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(mockedError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(mockedError))
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
})