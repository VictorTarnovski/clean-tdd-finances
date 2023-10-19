import { LoadBanksRepository } from '@/data/protocols/db'
import { DbLoadBanks } from '@/data/use-cases'
import { mockLoadBanksRepository } from '../../mocks'


type SutTypes = {
  sut: DbLoadBanks
  loadBanksRepositoryStub: LoadBanksRepository
}

const makeSut = (): SutTypes => {
  const loadBanksRepositoryStub = mockLoadBanksRepository()
  const sut = new DbLoadBanks(loadBanksRepositoryStub)
  return {
    sut,
    loadBanksRepositoryStub
  }
}

describe('DbLoadBanks Usecase', () => {

  test('Should call LoadBanksRepository', async () => {
    const { sut, loadBanksRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadBanksRepositoryStub, 'loadBanks')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should throw if LoadBanksRepository throw', async () => {
    const { sut, loadBanksRepositoryStub } = makeSut()
    jest.spyOn(loadBanksRepositoryStub, 'loadBanks').mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load()
    expect(promise).rejects.toThrow()
  })

  test('Should return LoadBanksRepository loadBanks return', async () => {
    const { sut, loadBanksRepositoryStub } = makeSut()
    jest.spyOn(loadBanksRepositoryStub, 'loadBanks').mockImplementationOnce(async () => [
      { id: 'any_id', name: 'any_bank', flags: [] }
    ])
    const banks = await sut.load()
    expect(banks).toEqual([{ id: 'any_id', name: 'any_bank', flags: [] }])
  })
})