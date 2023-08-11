import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpResponse } from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByToken } from "@/domain/use-cases/account/load-account-by-token"
import { AccountModel } from "@/domain/models/account"
import { mockAccountModel } from "../../domain/mocks"
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

const mockRequest = () => ({ accessToken: 'any_token' })

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => null)
    const httpResponse: HttpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'any_account_id' }))
  })

  test('Should return 500 if LoadAccountByToken thorws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const mockedError = new Error('Mocked Error')
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => { throw mockedError })
    const httpResponse: HttpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
  })
})