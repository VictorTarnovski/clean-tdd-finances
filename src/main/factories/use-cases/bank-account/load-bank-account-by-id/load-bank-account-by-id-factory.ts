import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { DbLoadBankAccountById } from "@/data/use-cases/bank-account/load-bank-account-by-id/db-load-bank-account-by-id"
import { MongoBankAccountRepository } from "@/infra/db/mongodb/bank-account/mongo-bank-account-repository"

export const makeDbLoadBankAccountById = (): LoadBankAccountById => new DbLoadBankAccountById(new MongoBankAccountRepository())