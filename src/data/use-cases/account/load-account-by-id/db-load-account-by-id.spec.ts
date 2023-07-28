import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { DbLoadAccountById } from './db-load-account-by-id'
import { mockAccountModel } from '@/domain/tests'
import { mockLoadAccountByIdRepository } from '@/data/tests'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new DbLoadAccountById(loadAccountByIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub
  }
}

describe('DbLoadAccountById Usecase', () => {

   test('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.load('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
   })

   test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => null)
    const account = await sut.load('any_id')
    expect(account).toBeNull()
   })

   test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_id')
    expect(account).toEqual(mockAccountModel())
   })

   test('Should thorw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const mockedError = new Error('Mocked Error')
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => { throw mockedError })
    const promise = sut.load('any_id')
    expect(promise).rejects.toThrow()
   })
})