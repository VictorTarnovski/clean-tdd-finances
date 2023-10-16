import { forbidden, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AccessDeniedError } from "@/presentation/errors"
import { LoadBankAccountById} from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadAccountById } from "@/domain/use-cases/account/load-account-by-id"
import { mockBankAccountModel, mockBankModel } from "../../domain/mocks"
import { mockLoadBankAccountById, mockLoadAccountById } from "../mocks"
import { LoadBankAccountByIdController } from "@/presentation/controllers/bank-account/load-bank-account-by-id-controller"


const mockRequest = () => ({ bankAccountId: 'any_bank_account_id', accountId: 'any_account_id' })

type SutTypes = {
  sut: LoadBankAccountByIdController
  loadBankAccountByIdStub: LoadBankAccountById,
  loadAccountByIdStub: LoadAccountById
}

const makeSut = (): SutTypes => {
  const loadBankAccountByIdStub = mockLoadBankAccountById()
  const loadAccountByIdStub = mockLoadAccountById()
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
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_bank_account_id')
  })

  test('Should return 404 if LoadBankAccountById fails', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    jest.spyOn(loadBankAccountByIdStub, 'load').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound('bankAccount'))
  })

  test('Should return 500 if LoadBankAccountById thorws', async () => {
    const { sut, loadBankAccountByIdStub } = makeSut()
    const mockedError = new Error('mocked error')
    jest.spyOn(loadBankAccountByIdStub, 'load').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call LoadAccountById with correct id', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return 200 if the provided accountId is equal to bankAccount accountId', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockBankAccountModel()))
  })

  test("Should return 200 if the provided accountId is a admin's one", async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest.spyOn(loadAccountByIdStub, 'load').mockImplementationOnce(async () => ({ id: 'admin_id', name: 'admin_name', email: 'admin_email', password: 'hashed_password', role: 'admin' }))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockBankAccountModel()))
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
        accountId: 'other_account_id',
        bank: mockBankModel() 
      }
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})