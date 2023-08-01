import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccount, AddBankAccountModel } from "@/domain/use-cases/add-bank-account"
import { LoadBankAccountById } from "@/domain/use-cases/load-bank-account-by-id"
import { mockBankAccountModel } from "@/domain/tests"

export const mockAddBankAccount = (): AddBankAccount => {
  class addBankAccount implements AddBankAccount {
    async add(account: AddBankAccountModel): Promise<BankAccountModel> {
      return mockBankAccountModel()
    }
  }
  return new addBankAccount()
}

export const mockLoadBankAccountById = (): LoadBankAccountById => {
  class LoadBankAccountByIdStub implements LoadBankAccountById {
    async load(): Promise<BankAccountModel | null> {
      return mockBankAccountModel()
    }
  }
  return new LoadBankAccountByIdStub()
}