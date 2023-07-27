import { DbLoadAccountById } from "@/data/use-cases/load-account-by-id/db-load-account-by-id"
import { LoadAccountById } from "@/domain/use-cases/load-account-by-id"
import { MongoAccountRepository } from "@/infra/db/mongodb/account/mongo-account-repository"

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountRepository = new MongoAccountRepository()
  return new DbLoadAccountById(accountRepository)
}