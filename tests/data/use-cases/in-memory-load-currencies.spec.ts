import { InMemoryLoadCurrencies } from "@/data/use-cases"
import { mockLoadCurrenciesRepository } from "../mocks/mock-load-currencies-repository"
import { mockCurrencyModels } from "../../domain/mocks/mock-currency"

const makeSut = () => {
  const loadCurrenciesRepositoryStub = mockLoadCurrenciesRepository()
  const sut = new InMemoryLoadCurrencies(loadCurrenciesRepositoryStub)
  return {
    sut,
    loadCurrenciesRepositoryStub
  }
}

describe('InMemoryLoadCurrencies UseCase', () => {

  test('Should call LoadCurrenciesRepository', async () => {
    const { sut, loadCurrenciesRepositoryStub } = makeSut()
    const loadCurrenciesSpy = jest.spyOn(loadCurrenciesRepositoryStub, 'loadCurrencies')
    await sut.load()
    expect(loadCurrenciesSpy).toHaveBeenCalled()
  })

  test('Should return an list of currencies on loadCurrencies success', async () => {
    const { sut } = makeSut()
    const currencies = await sut.load()
    expect(currencies).toEqual(mockCurrencyModels())
  })
})