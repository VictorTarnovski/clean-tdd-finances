import { AddTransactionController } from './add-transaction-controller'
import { mockAddTransactionModel } from '@/domain/tests'
import { AddTransaction } from '@/domain/use-cases/add-transaction'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddTransaction, mockValidation } from '@/presentation/tests'
import { ServerError } from '@/presentation/errors'
import { serverError, badRequest } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({ body: mockAddTransactionModel() })

type SutTypes = {
  sut: AddTransactionController,
  addTransactionStub: AddTransaction,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addTransactionStub = mockAddTransaction()
  const validationStub = mockValidation()
  const sut = new AddTransactionController(addTransactionStub, validationStub)
  return {
    sut,
    addTransactionStub,
    validationStub
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
})