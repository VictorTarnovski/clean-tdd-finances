import { DbLoadBankById } from "@/data/use-cases"
import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"

export const makeDbLoadBankById = (): DbLoadBankById => new DbLoadBankById(new MongoBankRepository())