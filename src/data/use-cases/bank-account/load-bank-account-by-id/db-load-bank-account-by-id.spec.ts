import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { DbLoadBankAccountById } from "@/data/use-cases/bank-account/load-bank-account-by-id/db-load-bank-account-by-id"
import { mockLoadBankAccountByIdRepository } from "@/data/tests"
import { mockBankAccountModel } from "@/domain/tests"

type SutTypes = {
  sut: DbLoadBankAccountById
  loadBankAccountByIdRepositoryStub: LoadBankAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBankAccountByIdRepositoryStub = mockLoadBankAccountByIdRepository()
  const sut = new DbLoadBankAccountById(loadBankAccountByIdRepositoryStub)
  return {
    sut,
    loadBankAccountByIdRepositoryStub
  }
}


describe('DbLoadBankAccountById UseCase', () => {
   test('Should call LoadBankAccountByIdRepository with correct id', async () => {
    const { sut, loadBankAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById')
    await sut.load('any_bank_account_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_bank_account_id')
   })

   test('Should return an BankAccount on success', async () => {
    const { sut } = makeSut()
    const bankAccount = await sut.load('any_bank_account_id')
    expect(bankAccount).toEqual(mockBankAccountModel())
   })

   test('Should return null if LoadBankAccountByIdRepository returns null', async () => {
    const { sut, loadBankAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => null)
    const bankAccount = await sut.load('any_bank_account_id')
    expect(bankAccount).toBeNull()
   })

   test('Should throw if LoadBankAccountByIdRepository thorws', async () => {
    const { sut, loadBankAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load('any_bank_account_id')
    expect(promise).rejects.toThrow()
   })
})