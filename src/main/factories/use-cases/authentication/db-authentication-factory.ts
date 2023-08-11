import env from "@/main/config/env"
import { DbAuthentication } from "@/data/use-cases/authentication/db-authentication"
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter"
import { MongoAccountRepository } from "@/infra/db/mongodb/mongo-account-repository"

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new MongoAccountRepository()
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}