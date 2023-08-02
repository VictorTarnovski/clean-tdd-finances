import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccount, AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { mockBankAccountModel } from "@/domain/tests"
import { SaveBankAccountBalance } from "@/domain/use-cases/bank-account/save-bank-account-balance"

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


export const mockSaveBankAccountBalance = (): SaveBankAccountBalance => {
  class SaveBankAccountByIdBalance implements SaveBankAccountBalance {
    async save(balance: number, bankAccountId: string): Promise<BankAccountModel> {
      return mockBankAccountModel()
    }
  }
  return new SaveBankAccountByIdBalance()
}