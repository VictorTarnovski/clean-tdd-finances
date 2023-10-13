import { mockAddIncomeTransactionModel, mockIncomeTransactionModel } from "../../../domain/mocks"
import { DbAddTransaction } from "@/data/use-cases"
import { mockAddTransactionRepository } from "../../mocks"
import mockdate from 'mockdate'

const makeSut = () => {
  const addTransactionRepository = mockAddTransactionRepository()
  const sut = new DbAddTransaction(addTransactionRepository)
  return {
    sut,
    addTransactionRepository
  }
}

describe('DbAddTransaction Usecase', () => {

  beforeAll(() => mockdate.set(new Date()))
  afterAll(() => mockdate.reset())
  
  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepository } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepository, 'add')
    await sut.add(mockAddIncomeTransactionModel())
    expect(addSpy).toBeCalledWith(mockAddIncomeTransactionModel())
  })

  test('Should return a Transaction on success', async () => {
    const { sut } = makeSut()
    const transaction = await sut.add(mockAddIncomeTransactionModel())
    expect(transaction).toEqual(mockIncomeTransactionModel())
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepository } = makeSut()
    jest.spyOn(addTransactionRepository, 'add').mockImplementationOnce(async () => { throw new Error()})
    const promise = sut.add(mockAddIncomeTransactionModel())
    expect(promise).rejects.toThrow()
  })
})