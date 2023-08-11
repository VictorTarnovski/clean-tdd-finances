import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"
import { DbLoadBankCardById } from "@/data/use-cases/bank-card/db-load-bank-card-by-id"
import { MongoBankCardRepository } from "@/infra/db/mongodb/mongo-bank-card-repository"

export const makeDbLoadBankCardById = (): LoadBankCardById => new DbLoadBankCardById(new MongoBankCardRepository())