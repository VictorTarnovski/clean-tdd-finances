import { BankAccountModel } from "@/domain/models/bank-account"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { DbLoadBankAccountById } from "@/data/use-cases/load-bank-account-by-id/db-load-bank-account-by-id"

interface SutTypes {
  sut: DbLoadBankAccountById
  loadBankAccountByIdRepositoryStub: LoadBankAccountByIdRepository
}

const makeLoadBankAccountByIdRepositoryStub = (): LoadBankAccountByIdRepository => {
  class LoadBankAccountByIdRepositoryStub implements LoadBankAccountByIdRepository {
    async loadById(id: string): Promise<BankAccountModel | null> {
      return makeBankAccount()
    }
  }
  return new LoadBankAccountByIdRepositoryStub()
}

const makeBankAccount = (): BankAccountModel => ({ id: 'valid_id', number: 123456, currency: 'USD', balance: 0, cards: []})

const makeSut = (): SutTypes => {
  const loadBankAccountByIdRepositoryStub = makeLoadBankAccountByIdRepositoryStub()
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
    await sut.load('valid_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
   })

   test('Should return an BankAccount on success', async () => {
    const { sut } = makeSut()
    const bankAccount = await sut.load('valid_id')
    expect(bankAccount).toEqual(makeBankAccount())
   })

   test('Should return null if LoadBankAccountByIdRepository returns null', async () => {
    const { sut, loadBankAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => null)
    const bankAccount = await sut.load('valid_id')
    expect(bankAccount).toBeNull()
   })

   test('Should throw if LoadBankAccountByIdRepository thorws', async () => {
    const { sut, loadBankAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load('valid_id')
    expect(promise).rejects.toThrow()
   })
})