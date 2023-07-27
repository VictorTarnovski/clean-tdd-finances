import { AccessDeniedError, BankAccountModel, HttpRequest, LoadBankAccountById, LoadAccountById, AccountModel } from "./load-bank-account-by-id-controller-protocols"
import { forbidden, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LoadBankAccountByIdController } from "./load-bank-account-by-id-controller"

const makeBankAccount = (): BankAccountModel => ({
  id: 'valid_id',
  number: 123456789,
  currency: 'USD',
  balance: 0,
  cards: [],
  accountId: 'valid_account_id'
})

const makeAccount = () => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeLoadBankAccountByIdStub = (): LoadBankAccountById => {
  class LoadBankAccountByIdStub implements LoadBankAccountById {
    async load(): Promise<BankAccountModel | null> {
      return makeBankAccount()
    }
  }
  return new LoadBankAccountByIdStub()
}

const makeLoadAccountByIdStub = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async load(): Promise<AccountModel | null> {
      return makeAccount()
    }
  }
  return new LoadAccountByIdStub()
}

const makeFakeRequest = (): HttpRequest => ({ accountId: 'valid_account_id', params: { bankAccountId: 'valid_id' }})

type SutTypes = {
  sut: LoadBankAccountByIdController
  loadBankAccountByIdStub: LoadBankAccountById,
  loadAccountByIdStub: LoadAccountById
}

const makeSut = (): SutTypes => {
  const loadBankAccountByIdStub = makeLoadBankAccountByIdStub()
  const loadAccountByIdStub = makeLoadAccountByIdStub()
  const sut = new LoadBankAccountByIdController(loadBankAccountByIdStub, loadAccountByIdStub)
  return {
    sut,
    loadBankAccountByIdStub,
    loadAccountByIdStub
  }
}

describe('LoadBankAccountById Controller', () => {
  test('Should call LoadBankAccountById with correct id', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBankAccountByIdStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
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

   test('Should return 403 if the provided accountId is not equal to bankAccount accountId', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    jest.spyOn(loadBankAccountByIdStub, 'load').mockImplementationOnce(async () => {
      return {
        id: 'valid_id',
        number: 123456789,
        currency: 'USD',
        balance: 0,
        cards: [],
        accountId: 'other_account_id'
      }
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if the provided accountId is equal to bankAccount accountId', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeBankAccount()))
  })

  test('Should call LoadAccountById with correct id', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('valid_account_id')
  })

})