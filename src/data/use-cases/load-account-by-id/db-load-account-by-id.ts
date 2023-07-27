import { AccountModel } from "@/domain/models/account"
import { LoadAccountById } from "@/domain/use-cases/load-account-by-id"
import { LoadAccountByIdRepository } from "@/data/protocols/db/account/load-account-by-id-repository"

export class DbLoadAccountById implements LoadAccountById {
  constructor(private readonly loadAccountByIdRepository: LoadAccountByIdRepository) { }
  async load(accountId: string): Promise<AccountModel | null> {
    const account = await this.loadAccountByIdRepository.loadById(accountId)
    if(!account) return null
    return account
  }
}