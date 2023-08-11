import { AddAccount, AddAccountModel, LoadAccountById } from "@/domain/use-cases"
import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "../../domain/mocks"

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