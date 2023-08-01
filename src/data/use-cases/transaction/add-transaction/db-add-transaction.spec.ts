import { mockAddTransactionModel, mockTransactionModel } from "@/domain/tests"
import { DbAddTransaction } from "./db-add-transaction"
import { mockAddTransactionRepository } from "@/data/tests"
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
    await sut.add(mockAddTransactionModel())
    expect(addSpy).toBeCalledWith(mockAddTransactionModel())
  })

  test('Should return a Transaction on success', async () => {
    const { sut } = makeSut()
    const transaction = await sut.add(mockAddTransactionModel())
    expect(transaction).toEqual(mockTransactionModel())
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepository } = makeSut()
    jest.spyOn(addTransactionRepository, 'add').mockImplementationOnce(async () => { throw new Error()})
    const promise = sut.add(mockAddTransactionModel())
    expect(promise).rejects.toThrow()
  })
})