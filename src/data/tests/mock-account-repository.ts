import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository"
import { LoadAccountByIdRepository } from "@/data/protocols/db/account/load-account-by-id-repository"
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/load-account-by-token-repository"
import { UpdateAccessTokenRepository } from "@/data/use-cases/authentication/db-authentication-protocols"
import { mockAccountModel } from "@/domain/tests"
import { AccountModel } from "@/domain/models/account"
import { AddAccountModel } from "@/domain/use-cases/account/add-account"

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepositoryStub {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(accountId: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository { 
      async updateAccessToken(id: string, token: string): Promise<void> {
          return 
      }
  }
  return new UpdateAccessTokenRepositoryStub()
}