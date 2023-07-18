import { SignUpController } from "../../../presentation/controllers/signup/signup-controller"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { DbAddAccount } from "../../../data/use-cases/add-account/db-add-account"
import { MongoAccountRepository } from "../../../infra/db/mongodb/account/mongo-account-repository"
import { MongoLogRespository } from "../../../infra/db/mongodb/log/mongo-log-repository"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller.decorator"
import { makeSignUpValidation } from "./signup-validation-factory"


export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcrytAdapter = new BcryptAdapter(salt)
    const addAccountRepository = new MongoAccountRepository()
    const dbAddAccount = new DbAddAccount(bcrytAdapter, addAccountRepository)
    const validationComposite = makeSignUpValidation()
    const signUpController = new SignUpController(dbAddAccount, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(signUpController, mongoLogRespository)
}