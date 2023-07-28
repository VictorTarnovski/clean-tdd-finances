import { mockAddBankCardModel, mockBankCardModel } from "@/domain/tests"
import { DbAddBankCard } from "./db-add-bank-card"
import { mockAddBankCardRepository } from "@/data/tests"

const makeSut = () => {
  const addBankCardRepository = mockAddBankCardRepository()
  const sut = new DbAddBankCard(addBankCardRepository)
  return {
    sut,
    addBankCardRepository
  }
}

describe('DbAddBankCard Usecase', () => {

  test('Should call AddBankCardRepository with correct values', async () => {
    const { sut, addBankCardRepository } = makeSut()
    const addSpy = jest.spyOn(addBankCardRepository, 'add')
    await sut.add(mockAddBankCardModel(), 'any_bank_account_id')
    expect(addSpy).toBeCalledWith({
      number: mockAddBankCardModel().number,
      flag: mockAddBankCardModel().flag,
      expiresAt: mockAddBankCardModel().expiresAt
    }, 'any_bank_account_id')
  })

  test('Should return an BankCard on success', async () => {
    const { sut } = makeSut()
    const bankCard = await sut.add(mockAddBankCardModel(), 'any_bank_account_id')
    expect(bankCard).toEqual(mockBankCardModel())
  })
})