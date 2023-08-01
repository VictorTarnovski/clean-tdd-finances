import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"
import { BankAccountModel } from "@/domain/models/bank-account"
import { mockBankAccountModel } from "@/domain/tests"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"
import { SaveBalanceRepository } from "@/data/protocols/db/bank-account/save-balance-repository"

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

export const mockSaveBalanceRepository = (): SaveBalanceRepository => {
  class SaveBalanceRepositoryStub implements SaveBalanceRepository {
    async save(balance: number, bankAccountId: string): Promise<BankAccountModel> {
      return mockBankAccountModel()
    }
  }
  return new SaveBalanceRepositoryStub()
}