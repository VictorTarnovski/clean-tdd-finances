import { LoginController } from "../../../../presentation/controllers/login/login/login-controller"
import { Controller } from "../../../../presentation/protocols"
import { makeDbAuthentication } from "../../use-cases/authentication/db-authentication-factory"
import { makeLoginValidation } from "./login-validation-factory"

export const makeLoginController = (): Controller => new LoginController(makeDbAuthentication(), makeLoginValidation())