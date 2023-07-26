import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '@/domain/models/account'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

const makeFakeAccount = () => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<AccountModel | null> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter,
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
   test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
   })

   test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
   })

   test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
   })

   test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(async () => null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
   })

   test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
   })

   test('Should thorw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const mockedError = new Error('Mocked Error')
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(async () => { throw mockedError })
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrow()
   })

   test('Should thorw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    const mockedError = new Error('Mocked Error')
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => { throw mockedError })
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrow()
   })
})