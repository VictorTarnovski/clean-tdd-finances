import { AddTransactionController } from './add-transaction-controller'
import { mockAddTransactionModel } from '@/domain/tests'
import { AddTransaction } from '@/domain/use-cases/add-transaction'
import { HttpRequest } from '@/presentation/protocols'
import { mockAddTransaction } from '@/presentation/tests'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({ body: mockAddTransactionModel() })

type SutTypes = {
  sut: AddTransactionController,
  addTransactionStub: AddTransaction
}

const makeSut = (): SutTypes => {
  const addTransactionStub = mockAddTransaction()
  const sut = new AddTransactionController(addTransactionStub)
  return {
    sut,
    addTransactionStub
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
})