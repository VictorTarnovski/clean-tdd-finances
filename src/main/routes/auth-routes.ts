import { Router } from "express"
import { adaptRoute } from "@/main/adapters/express/express-route-adapter"
import { makeSignUpController } from "@/main/factories/controllers/auth/signup/signup-controller-factory"
import { makeLoginController } from "@/main/factories/controllers/auth/login/login-controller-factory"
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeLogControllerDecorator(makeSignUpController())))
    router.post('/login', adaptRoute(makeLogControllerDecorator(makeLoginController())))
}