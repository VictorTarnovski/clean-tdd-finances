import { DbAddBankAccount } from "../../../../data/use-cases/add-bank-account/db-add-bank-account"
import { MongoBankAccountRepository } from "../../../../infra/db/mongodb/bank-account/mongo-bank-account-repository"

export const makeDbAddBankAccount = (): DbAddBankAccount => new DbAddBankAccount(new MongoBankAccountRepository())