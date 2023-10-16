import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { DbLoadBankAccountById } from "@/data/use-cases/bank-account/db-load-bank-account-by-id"
import { MongoBankAccountRepository } from "@/infra/db/mongodb/mongo-bank-account-repository"
import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"

export const makeDbLoadBankAccountById = (): LoadBankAccountById => {
  const bankRepository = new MongoBankRepository()
  const bankAccountRepository = new MongoBankAccountRepository(bankRepository)
  return new DbLoadBankAccountById(bankAccountRepository)
}