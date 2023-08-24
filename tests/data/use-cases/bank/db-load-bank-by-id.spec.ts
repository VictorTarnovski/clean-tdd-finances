import { LoadBankByIdRepository } from '@/data/protocols/db'
import { DbLoadBankById } from '@/data/use-cases'
import { mockLoadBankByIdRepository } from '../../mocks'


type SutTypes = {
  sut: DbLoadBankById
  loadBankByIdRepositoryStub: LoadBankByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBankByIdRepositoryStub = mockLoadBankByIdRepository()
  const sut = new DbLoadBankById(loadBankByIdRepositoryStub)
  return {
    sut,
    loadBankByIdRepositoryStub
  }
}

describe('DbLoadBankById Usecase', () => {

  test('Should call LoadBankByIdRepository with correct id', async () => {
    const { sut, loadBankByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadBankByIdRepositoryStub, 'loadBankById')
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if LoadBankByIdRepository throw', async () => {
    const { sut, loadBankByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankByIdRepositoryStub, 'loadBankById').mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load('any_id')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadBankByIdRepository returns null', async () => {
    const { sut, loadBankByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankByIdRepositoryStub, 'loadBankById').mockImplementationOnce(async () => null)
    const bank = await sut.load('any_id')
    expect(bank).toBeNull()
  })
})