import { LoginController } from "../../../../../presentation/controllers/auth/login/login-controller"
import { Controller } from "../../../../../presentation/protocols"
import { makeDbAuthentication } from "../../../use-cases/account/authentication/db-authentication-factory"
import { makeLoginValidation } from "./login-validation-factory"

export const makeLoginController = (): Controller => new LoginController(makeDbAuthentication(), makeLoginValidation())