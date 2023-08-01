import { AddTransactionController } from './add-transaction-controller'
import { mockAddTransactionModel } from '@/domain/tests'
import { AddTransaction } from '@/domain/use-cases/add-transaction'
import { LoadBankAccountById } from '@/domain/use-cases/load-bank-account-by-id'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddTransaction, mockLoadBankAccountById, mockValidation } from '@/presentation/tests'
import { ServerError } from '@/presentation/errors'
import { serverError, badRequest } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({ body: mockAddTransactionModel() })

type SutTypes = {
  sut: AddTransactionController,
  addTransactionStub: AddTransaction,
  validationStub: Validation,
  loadBankAccountById: LoadBankAccountById
}

const makeSut = (): SutTypes => {
  const addTransactionStub = mockAddTransaction()
  const validationStub = mockValidation()
  const loadBankAccountById = mockLoadBankAccountById()
  const sut = new AddTransactionController(addTransactionStub, validationStub, loadBankAccountById)
  return {
    sut,
    addTransactionStub,
    validationStub,
    loadBankAccountById
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
})