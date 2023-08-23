import { InMemoryCurrencyRepository } from "@/infra/in-memory/currency/in-memory-currency-repository"

describe('InMemoryCurrencyRepository', () => {

  test('Should return a list of currency on loadCurrencies success', async () => {
    const sut = new InMemoryCurrencyRepository()
    const currencies = await sut.loadCurrencies()
    expect(currencies).toBeTruthy()
    expect(currencies.length).toBeGreaterThanOrEqual(1)
  })
})