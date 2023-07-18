import { BankCardController } from "../../../presentation/controllers/bank-cards/bank-card-controller"
import { DbAddBankCard } from "../../../data/use-cases/add-bank-card/db-add-bank-card"
import { MongoBankCardRepository } from "../../../infra/db/mongodb/bank-card/mongo-bank-card-repository"
import { MongoLogRespository } from "../../../infra/db/mongodb/log/mongo-log-repository"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller.decorator"
import { makeBankCardValidation } from "./bank-card-validation-factory"


export const makeBankCardController = (): Controller => {
    const addBankCardRepository = new MongoBankCardRepository()
    const dbAddBankCard = new DbAddBankCard(addBankCardRepository)
    const validationComposite = makeBankCardValidation()
    const bankCardController = new BankCardController(dbAddBankCard, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(bankCardController, mongoLogRespository)
}