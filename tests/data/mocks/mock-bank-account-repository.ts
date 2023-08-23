import { AddBankAccountRepository, LoadBankAccountByIdRepository, SaveBalanceRepository } from "@/data/protocols/db"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"
import { BankAccountModel } from "@/domain/models/bank-account"
import { mockBankAccountModel } from "../../domain/mocks"

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
    async saveBalance(balance: number, bankAccountId: string): Promise<BankAccountModel> {
      return mockBankAccountModel()
    }
  }
  return new SaveBalanceRepositoryStub()
}