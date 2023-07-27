import { DbAddBankCard } from "@/data/use-cases/bank-card/add-bank-card/db-add-bank-card"
import { MongoBankCardRepository } from "@/infra/db/mongodb/bank-card/mongo-bank-card-repository"

export const makeDbAddBankCard = (): DbAddBankCard => new DbAddBankCard(new MongoBankCardRepository())