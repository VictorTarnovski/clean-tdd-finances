import { SignUpController } from "../../../../../presentation/controllers/auth/signup/signup-controller"
import { Controller } from "../../../../../presentation/protocols"
import { makeSignUpValidation } from "./signup-validation-factory"
import { makeDbAuthentication } from "../../../use-cases/account/authentication/db-authentication-factory"
import { makeDbAddAccount } from "../../../use-cases/account/add-account/db-add-account-factory"


export const makeSignUpController = (): Controller => new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())