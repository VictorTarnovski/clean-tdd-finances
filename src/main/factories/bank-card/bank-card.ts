import { BankCardController } from "../../../presentation/controllers/bank-cards/bank-card"
import { DbAddBankCard } from "../../../data/use-cases/add-bank-card/db-add-bank-card"
import { MongoBankCardRepository } from "../../../infra/db/mongodb/bank-card-respository/bank-card"
import { MongoLogRespository } from "../../../infra/db/mongodb/log-repository/log"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log"
import { makeBankCardValidation } from "./bank-card-validation"


export const makeBankCardController = (): Controller => {
    const addBankCardRepository = new MongoBankCardRepository()
    const dbAddBankCard = new DbAddBankCard(addBankCardRepository)
    const validationComposite = makeBankCardValidation()
    const bankCardController = new BankCardController(dbAddBankCard, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(bankCardController, mongoLogRespository)
}