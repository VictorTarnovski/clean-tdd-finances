import { SignUpController } from "../../presentation/controllers/signup/signup"
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter"
import { DbAddAccount } from "../../data/use-cases/add-account/db-add-account"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"
import { MongoAccountRepository } from "../../infra/db/mongodb/account-repository/account"
import { MongoLogRespository } from "../../infra/db/mongodb/log-repository/log"
import { Controller } from "../../presentation/protocols"
import { LogControllerDecorator } from "../decorators/log"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { makeSignUpValidation } from "./signup-validation"


export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcrytAdapter = new BcryptAdapter(salt)
    const addAccountRepository = new MongoAccountRepository()
    const dbAddAccount = new DbAddAccount(bcrytAdapter, addAccountRepository)
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const validationComposite = makeSignUpValidation()
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, validationComposite)
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(signUpController, mongoLogRespository)
}