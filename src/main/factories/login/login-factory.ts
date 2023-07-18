import env from "../../config/env"
import { DbAuthentication } from "../../../data/use-cases/authentication/db-authentication"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter"
import { MongoAccountRepository } from "../../../infra/db/mongodb/account/mongo-account-repository"
import { MongoLogRespository } from "../../../infra/db/mongodb/log/mongo-log-repository"
import { LoginController } from "../../../presentation/controllers/login/login-controller"
import { Controller } from "../../../presentation/protocols"
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator-adapter"
import { LogControllerDecorator } from "../../decorators/log-controller.decorator"

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountRepository = new MongoAccountRepository()
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const dbAuthentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
    const loginController = new LoginController(emailValidatorAdapter, dbAuthentication)
    const logErrorRespotiroy = new MongoLogRespository()
    return new LogControllerDecorator(loginController, logErrorRespotiroy)
}