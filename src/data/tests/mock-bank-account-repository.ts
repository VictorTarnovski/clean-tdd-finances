import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"
import { AddBankAccountModel } from "@/domain/use-cases/add-bank-account"
import { BankAccountModel } from "@/domain/models/bank-account"
import { mockBankAccountModel } from "@/domain/tests"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"

export const mockAddBankAccountRepository = (): AddBankAccountRepository => {

  class AddBankAccountRepositoryStub implements AddBankAccountRepository {
      async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
          return mockBankAccountModel()
      }
  }

  return new AddBankAccountRepositoryStub()
}

export const mockLoadBankAccountByIdRepository = (): LoadBankAccountByIdRepository => {
  class LoadBankAccountByIdRepositoryStub implements LoadBankAccountByIdRepository {
    async loadById(id: string): Promise<BankAccountModel | null> {
      return mockBankAccountModel()
    }
  }
  return new LoadBankAccountByIdRepositoryStub()
}