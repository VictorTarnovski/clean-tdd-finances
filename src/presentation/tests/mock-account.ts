import { AddAccount, AddAccountModel } from "@/domain/use-cases/account/add-account"
import { AccountModel } from "@/domain/models/account"
import { mockAccountModel } from "@/domain/tests"
import { LoadAccountById } from "@/domain/use-cases/account/load-account-by-id"

export const mockAddAccount = () => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new AddAccountStub()
}

export const mockLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async load(): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByIdStub()
}