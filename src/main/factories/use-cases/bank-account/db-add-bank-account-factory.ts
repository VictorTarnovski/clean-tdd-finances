import { DbAddBankAccount } from "@/data/use-cases/bank-account/db-add-bank-account"
import { MongoBankAccountRepository } from "@/infra/db/mongodb/mongo-bank-account-repository"
import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"

export const makeDbAddBankAccount = (): DbAddBankAccount => new DbAddBankAccount(new MongoBankAccountRepository(new MongoBankRepository()))