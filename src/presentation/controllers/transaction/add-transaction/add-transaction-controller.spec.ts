import { AddTransactionController } from './add-transaction-controller'
import { mockAddTransactionModel, mockTransactionModel } from '@/domain/tests'
import { AddTransaction } from '@/domain/use-cases/transaction/add-transaction'
import { LoadBankAccountById } from '@/domain/use-cases/bank-account/load-bank-account-by-id'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddTransaction, mockLoadBankAccountById, mockLoadBankCardById, mockValidation } from '@/presentation/tests'
import { ServerError } from '@/presentation/errors'
import { ok, badRequest, notFound, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadBankCardById } from '@/domain/use-cases/bank-card/load-bank-card-by-id'

const mockRequest = (): HttpRequest => ({ body: mockAddTransactionModel() })

type SutTypes = {
  sut: AddTransactionController,
  addTransactionStub: AddTransaction,
  validationStub: Validation,
  loadBankAccountById: LoadBankAccountById
  loadBankCardById: LoadBankCardById
}

const makeSut = (): SutTypes => {
  const addTransactionStub = mockAddTransaction()
  const validationStub = mockValidation()
  const loadBankAccountById = mockLoadBankAccountById()
  const loadBankCardById = mockLoadBankCardById()
  const sut = new AddTransactionController(addTransactionStub, validationStub, loadBankAccountById, loadBankCardById)
  return {
    sut,
    addTransactionStub,
    validationStub,
    loadBankAccountById,
    loadBankCardById
  }
}

describe('AddTransaction Controller', () => {

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addTransactionStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(mockAddTransactionModel())
  })

  test('Should return 500 if AddTransaction throws', async () => {
    const { sut, addTransactionStub } = makeSut()
    const httpRequest = mockRequest()
    jest.spyOn(addTransactionStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal Server Error')))
  })

  test('Should call Validation with correct values', () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(mockAddTransactionModel())
  })

  test('Should return an Error if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(mockedError))
  })
  
  test('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error()
    const httpRequest = mockRequest()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call LoadBankAcountById with correct id', async () => {
    const { sut, loadBankAccountById } = makeSut()
    const loadSpy = jest.spyOn(loadBankAccountById, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_bank_account_id')
  })

  test('Should return 404 if LoadBankAccountById returns null', async () => {
    const { sut, loadBankAccountById } = makeSut()
    jest.spyOn(loadBankAccountById, 'load').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound('bankAccount'))
  })

  test('Should return 500 if LoadBankAccountById throws', async () => {
    const { sut, loadBankAccountById } = makeSut()
    const mockedError = new Error()
    const httpRequest = mockRequest()
    jest.spyOn(loadBankAccountById, 'load').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call LoadBankCardById with correct id', async () => {
    const { sut, loadBankCardById } = makeSut()
    const loadSpy = jest.spyOn(loadBankCardById, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_bank_card_id')
  })

  test('Should return 404 if LoadBankCardById returns null', async () => {
    const { sut, loadBankCardById } = makeSut()
    jest.spyOn(loadBankCardById, 'load').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound('bankCard'))
  })

  test('Should return 500 if LoadBankCardById throws', async () => {
    const { sut, loadBankCardById } = makeSut()
    const mockedError = new Error()
    const httpRequest = mockRequest()
    jest.spyOn(loadBankCardById, 'load').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockTransactionModel()))
  })
})