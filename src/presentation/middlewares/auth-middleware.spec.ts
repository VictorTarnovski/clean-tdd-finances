import { HttpRequest, HttpResponse, LoadAccountByToken, AccountModel} from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'

const makeFakeRequest = (): HttpRequest => ({ headers: { 'x-access-token': 'any_token' }})

const makeFakeAccount = () => ({
   id: 'valid_id',
   name: 'valid_name',
   email: 'valid_email@mail.com',
   password: 'hashed_password'
})

const makeLoadAccountByTokenStub = (): LoadAccountByToken  => {
   class LoadAccountByTokenStub implements LoadAccountByToken {
      async load(acessToken: string, role?: string): Promise<AccountModel | null> {
         return makeFakeAccount()
      }
   }
   return new LoadAccountByTokenStub()
}

interface SutTypes {
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
      await sut.handle(makeFakeRequest())
      expect(loadSpy).toHaveBeenCalledWith('any_token', role)
   })

   test('Should return 403 if LoadAccountByToken returns null', async () => {
      const { sut, loadAccountByTokenStub } = makeSut()
      jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => null)
      const httpResponse: HttpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
   })

   test('Should return 200 if LoadAccountByToken returns an account', async () => {
      const { sut } = makeSut()
      const httpResponse: HttpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
   })

   test('Should return 500 if LoadAccountByToken thorws', async () => {
      const { sut, loadAccountByTokenStub } = makeSut()
      const mockedError = new Error('Mocked Error')
      jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => { throw mockedError })
      const httpResponse: HttpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(mockedError))
   })
})