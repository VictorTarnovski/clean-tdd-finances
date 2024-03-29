import { SignUpController } from "@/presentation/controllers/auth/signup-controller"
import { Controller } from "@/presentation/protocols"
import { makeSignUpValidation } from "./signup-validation-factory"
import { makeDbAuthentication } from "@/main/factories/use-cases/authentication/db-authentication-factory"
import { makeDbAddAccount } from "@/main/factories/use-cases/account/db-add-account-factory"


export const makeSignUpController = (): Controller => new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())