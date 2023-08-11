import { DbLoadAccountByToken } from "@/data/use-cases/account/db-load-account-by-token"
import { LoadAccountByToken } from "@/domain/use-cases/account/load-account-by-token"
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter"
import { MongoAccountRepository } from "@/infra/db/mongodb/mongo-account-repository"
import env from "@/main/config/env"

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new MongoAccountRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}