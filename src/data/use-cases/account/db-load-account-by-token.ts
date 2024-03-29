import { LoadAccountByToken } from "@/domain/use-cases/account/load-account-by-token"
import { Decrypter } from "@/data/protocols/criptography/decrypter"
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/load-account-by-token-repository"
import { AccountModel } from "@/domain/models/account"

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter, private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}
  async load(accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if(token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      return account
    }
    return null
  }
}