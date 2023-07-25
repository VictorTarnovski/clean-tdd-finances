import { BankAccountModel } from "../../../domain/models/bank-account"
import { LoadBankAccountByIdRepository } from "../../../data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { DbLoadBankAccountById } from "../load-bank-account-by-id/db-load-bank-account-by-id"

describe('DbLoadBankAccountById UseCase', () => {
   test('Should call LoadBankAccountByIdRepository with correct id', async () => {
    class LoadBankAccountByIdRepositoryStub implements LoadBankAccountByIdRepository {
      async loadById(id: string): Promise<BankAccountModel | null> {
        return null
      }
    }
    const loadBankAccountByIdRepositoryStub = new LoadBankAccountByIdRepositoryStub()
    const loadByIdSpy = jest.spyOn(loadBankAccountByIdRepositoryStub, 'loadById')
    const sut = new DbLoadBankAccountById(loadBankAccountByIdRepositoryStub)
    await sut.load('valid_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
   })
})