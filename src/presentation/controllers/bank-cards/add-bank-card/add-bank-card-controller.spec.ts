import { AddBankCardController } from "./add-bank-card-controller"
import { badRequest, notFound, serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors'
import { AddBankCard } from '@/domain/use-cases/add-bank-card'
import { Validation } from "@/presentation/protocols"
import { mockValidation, mockAddBankCard, mockLoadBankAccountById } from "@/presentation/tests"
import { mockAddBankCardModel, mockBankCardModel } from "@/domain/tests"
import { LoadBankAccountById } from "@/domain/use-cases/load-bank-account-by-id"

const mockRequest = () => ({
  ...mockAddBankCardModel(),
  bankAccountId: 'any_bank_account_id'
})

type SutTypes = {
  sut: AddBankCardController,
  addBankCardStub: AddBankCard,
  validationStub: Validation
  loadBankAccountById: LoadBankAccountById
}

const makeSut = (): SutTypes => {
  const addBankCardStub = mockAddBankCard()
  const validationStub = mockValidation()
  const loadBankAccountById = mockLoadBankAccountById()
  const sut = new AddBankCardController(addBankCardStub, validationStub, loadBankAccountById)
  return {
    sut,
    addBankCardStub,
    validationStub,
    loadBankAccountById
  }
}

describe('AddBankCard Controller', () => {

  test('Should call AddBankCard with correct values', async () => {
    const { sut, addBankCardStub } = makeSut()
    const addSpy = jest.spyOn(addBankCardStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(mockAddBankCardModel(), 'any_bank_account_id')
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockBankCardModel())
  })

  test('Should return 500 if AddBankCard throws', async () => {
    const { sut, addBankCardStub } = makeSut()
    const request = mockRequest()
    jest.spyOn(addBankCardStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'))
  })

  test('Should call Validation with correct values', () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    sut.handle(request)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return an Error if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { return mockedError })
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(mockedError))
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const mockedError = new Error()
    const request = mockRequest()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call LoadBankAcountById with correct id', async () => {
    const { sut, loadBankAccountById } = makeSut()
    const loadSpy = jest.spyOn(loadBankAccountById, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_bank_account_id')
  })

  test('Should return 404 if LoadBankAcountById returns null', async () => {
    const { sut, loadBankAccountById } = makeSut()
    jest.spyOn(loadBankAccountById, 'load').mockImplementationOnce(async () => null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound('bankAccount'))
  })

  test('Should return 500 if LoadBankAcountById throws', async () => {
    const { sut, loadBankAccountById } = makeSut()
    const mockedError = new Error()
    jest.spyOn(loadBankAccountById, 'load').mockImplementationOnce(async () => { throw mockedError })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
  })
})