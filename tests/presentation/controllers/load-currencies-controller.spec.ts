import { serverError } from "@/presentation/helpers/http/http-helper"
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

  test('Should return return 500 if LoadCurrencies thorw', async () => {
    const { sut, loadCurenciesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadCurenciesStub, 'load').mockImplementation( () => { throw error })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(error))
  })
})