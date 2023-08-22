import { InMemoryLoadCurrencies } from "@/data/use-cases"
import { LoadCurrenciesRepository } from "@/data/protocols/in-memory"
import { CurrencyModel } from "@/domain/models"

export class LoadCurrenciesRepositoryStub implements LoadCurrenciesRepository {
  async loadCurrencies(): Promise<CurrencyModel[]> {
    return []
  }
}

const makeSut = () => {
  const loadCurrenciesRepositoryStub = new LoadCurrenciesRepositoryStub()
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
})