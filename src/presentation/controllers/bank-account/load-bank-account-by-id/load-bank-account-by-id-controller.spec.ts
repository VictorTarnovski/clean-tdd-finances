import { BankAccountModel, HttpRequest, LoadBankAccountById } from "./load-bank-account-by-id-controller-protocols"
import { notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
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

const makeFakeRequest = (): HttpRequest => ({ params: { bankAccountId: 'valid_id' }})

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
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeBankAccount()))
  })

  test('Should return 404 if LoadBankAccountById fails', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    jest.spyOn(loadBankAccountByIdStub, 'load').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound('bankAccount'))
  })

  test('Should return 500 if LoadBankAccountById thorws', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(loadBankAccountByIdStub, 'load').mockImplementationOnce(() => {
        throw mockedError
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
   })
})