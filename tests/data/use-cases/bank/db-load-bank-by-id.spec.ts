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
})