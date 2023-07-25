import { DbLoadAccountByToken } from "../../../../../data/use-cases/load-account-by-token/db-load-account-by-token"
import { LoadAccountByToken } from "../../../../../domain/use-cases/load-account-by-token"
import { JwtAdapter } from "../../../../../infra/criptography/jwt-adapter/jwt-adapter"
import { MongoAccountRepository } from "../../../../../infra/db/mongodb/account/mongo-account-repository"
import env from "../../../../config/env"

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new MongoAccountRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}