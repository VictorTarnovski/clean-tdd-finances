import { LoadTransactionsByBankAccountController } from '@/presentation/controllers/transaction/load-transactions-by-bank-account-controller'
import { mockLoadBankAccountById, mockLoadTransactionsByBankAccount, mockValidation } from '../mocks'
import { Validation } from '@/presentation/protocols'
import { LoadBankAccountById, LoadTransactionsByBankAccount } from '@/domain/use-cases'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockTransactionModels } from '../../domain/mocks'
import mockdate from "mockdate"

const mockRequest = () => ({ bankAccountId: 'any_bank_account_id' })

type SutTypes = {
  sut: LoadTransactionsByBankAccountController,
  validation: Validation,
  loadBankAccountById: LoadBankAccountById,
  loadTransactionsByBankAccount: LoadTransactionsByBankAccount
}

const makeSut = (): SutTypes => {
  const validation = mockValidation()
  const loadBankAccountById = mockLoadBankAccountById()
  const loadTransactionsByBankAccount = mockLoadTransactionsByBankAccount()
  const sut = new LoadTransactionsByBankAccountController(validation, loadBankAccountById, loadTransactionsByBankAccount)
  return {
    sut,
    validation,
    loadBankAccountById,
    loadTransactionsByBankAccount
  } 
}

describe('LoadTransactionsByBankAccount Controller', () => {

  beforeAll(() => mockdate.set(new Date()))
  afterAll(() => mockdate.reset())

  test('Should call Validation with correct values', async () => {
    const { sut, validation } = makeSut()
    const validateSpy = jest.spyOn(validation, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validation } = makeSut()
    const mockedError = new Error()
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => { return mockedError })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(mockedError))
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validation } = makeSut()
    const mockedError = new Error()
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(mockRequest())
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
    jest.spyOn(loadBankAccountById, 'load').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should call LoadTransactionsByBankAccount with correct id', async () => {
    const { sut, loadTransactionsByBankAccount } = makeSut()
    const loadSpy = jest.spyOn(loadTransactionsByBankAccount, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_bank_account_id')
  })

  test('Should return 500 if LoadTransactionsByBankAccount throws', async () => {
    const { sut, loadTransactionsByBankAccount } = makeSut()
    const mockedError = new Error()
    jest.spyOn(loadTransactionsByBankAccount, 'load').mockImplementationOnce(() => { throw mockedError })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(mockedError))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockTransactionModels()))
  })
})