import { DbSaveBankAccountBalance } from "@/data/use-cases/bank-account/db-save-bank-account-balance"
import { SaveBankAccountBalance } from "@/domain/use-cases/bank-account/save-bank-account-balance"
import { MongoBankAccountRepository } from "@/infra/db/mongodb/mongo-bank-account-repository"

export const makeDbSaveBankAccountBalance = (): SaveBankAccountBalance => new DbSaveBankAccountBalance(new MongoBankAccountRepository())