import { mockAddTransactionModel } from "@/domain/tests"
import { DbAddTransaction } from "./db-add-transaction"
import { mockAddTransactionRepository } from "@/data/tests"

const makeSut = () => {
  const addTransactionRepository = mockAddTransactionRepository()
  const sut = new DbAddTransaction(addTransactionRepository)
  return {
    sut,
    addTransactionRepository
  }
}

describe('DbAddTransaction Usecase', () => {

  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepository } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepository, 'add')
    await sut.add(mockAddTransactionModel())
    expect(addSpy).toBeCalledWith(mockAddTransactionModel())
  })
})