import { DbLoadBanks } from "@/data/use-cases"
import { MongoBankRepository } from "@/infra/db/mongodb/mongo-bank-repository"

export const makeDbLoadBanks = (): DbLoadBanks => new DbLoadBanks(new MongoBankRepository())