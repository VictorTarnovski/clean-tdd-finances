import { mockAddIncomeTransactionModel } from "../../../domain/mocks"
import { DbLoadTransactionsByBankAccountId } from "@/data/use-cases"
import { mockLoadTransactionsByBankAccountIdRepository } from "../../mocks"



const makeSut = () => {
  const loadTransactionsByBankAccountIdRepository = mockLoadTransactionsByBankAccountIdRepository()
  const sut = new DbLoadTransactionsByBankAccountId(loadTransactionsByBankAccountIdRepository)
  return {
    sut,
    loadTransactionsByBankAccountIdRepository
  }
}

describe('DbLoadTransactionsByBankAccountId Usecase', () => {
  
  test('Should call LoadTransactionsByBankAccountIdRepository with correct bankAccountId', async () => {
    const { sut, loadTransactionsByBankAccountIdRepository } = makeSut()
    const loadByBankAccountIdSpy = jest.spyOn(loadTransactionsByBankAccountIdRepository, "loadByBankAccountId")
    await sut.load('any_bank_account_id')
    expect(loadByBankAccountIdSpy).toHaveBeenCalledWith('any_bank_account_id')
  })

  test('Should throw if LoadTransactionsByBankAccountIdRepository throws', async () => {
    const { sut, loadTransactionsByBankAccountIdRepository } = makeSut()
    jest.spyOn(loadTransactionsByBankAccountIdRepository, "loadByBankAccountId").mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load('any_bank_account_id')
    expect(promise).rejects.toThrow()
  })

  test('Should return a Transaction List on success', async () => {
    const { sut } = makeSut()
    const transactions = await sut.load('any_bank_account_id')
    expect(transactions).toBeTruthy()
  })
})