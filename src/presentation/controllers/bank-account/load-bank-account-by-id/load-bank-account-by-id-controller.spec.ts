import { BankAccountModel, LoadBankAccountById } from "./load-bank-account-by-id-controller-protocols"
import { ok } from "../../../helpers/http/http-helper"
import { LoadBankAccountByIdController } from "./load-bank-account-by-id-controller"

const makeBankAccount = (): BankAccountModel => ({
  id: 'valid_id',
  number: 123456789,
  currency: 'USD',
  balance: 0,
  cards: []
})

const makeLoadBankAccountByIdStub = (): LoadBankAccountById => {
  class LoadBankAccountByIdStub implements LoadBankAccountById {
    async load(): Promise<BankAccountModel | null> {
      return makeBankAccount()
    }
  }
  return new LoadBankAccountByIdStub()
}

interface SutTypes {
  sut: LoadBankAccountByIdController
  loadBankAccountByIdStub: LoadBankAccountById
}

const makeSut = (): SutTypes => {
  const loadBankAccountByIdStub = makeLoadBankAccountByIdStub()
  const sut = new LoadBankAccountByIdController(loadBankAccountByIdStub)
  return {
    sut,
    loadBankAccountByIdStub
  }
}

describe('LoadBankAccountById Controller', () => {
  test('Should call LoadBankAccountById with correct id', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBankAccountByIdStub, 'load')
    await sut.handle({ params: { bankAccountId: 'valid_id'}})
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ params: { bankAccountId: 'valid_id' }})
    expect(httpResponse).toEqual(ok(makeBankAccount()))
  })
})