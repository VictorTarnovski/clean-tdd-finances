import { mockLoadTransactionsByBankAccountRepository } from "@/data/tests"
import { DbLoadTransactionsByBankAccount } from "./db-load-transactions-by-bank-account"

const makeSut = () => {
  const loadTransactionsByBankAccountRepositoryStub = mockLoadTransactionsByBankAccountRepository()
  const sut = new DbLoadTransactionsByBankAccount(loadTransactionsByBankAccountRepositoryStub)
  return {
    sut,
    loadTransactionsByBankAccountRepositoryStub
  }
}

describe('DbLoadTransactionsByBankAccount Usecase', () => {
  
  test('Should call LoadTransactionRepositorysByBankAccount with correct id', async () => {
    const { sut, loadTransactionsByBankAccountRepositoryStub } = makeSut()
    const loadByBankAccountSpy = jest.spyOn(loadTransactionsByBankAccountRepositoryStub, 'loadByBankAccount')
    await sut.load('any_bank_account_id')
    expect(loadByBankAccountSpy).toBeCalledWith('any_bank_account_id')
  })
})