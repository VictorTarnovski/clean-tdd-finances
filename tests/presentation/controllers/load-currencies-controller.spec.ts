import { mockLoadCurrencies } from "../mocks/mock-currency"
import { LoadCurrenciesController } from "@/presentation/controllers/currency/load-currencies-controller"

const makeSut = () => {
  const loadCurenciesStub = mockLoadCurrencies()
  const sut = new LoadCurrenciesController(loadCurenciesStub)
  return {
    sut,
    loadCurenciesStub
  }
}

describe('LoadCurrencies Controller', () => {
  test('Should call LoadCurrencies', async () => {
    const { sut, loadCurenciesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCurenciesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})