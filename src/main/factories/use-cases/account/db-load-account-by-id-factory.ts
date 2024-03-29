import { DbLoadAccountById } from "@/data/use-cases/account/db-load-account-by-id"
import { LoadAccountById } from "@/domain/use-cases/account/load-account-by-id"
import { MongoAccountRepository } from "@/infra/db/mongodb/mongo-account-repository"

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountRepository = new MongoAccountRepository()
  return new DbLoadAccountById(accountRepository)
}