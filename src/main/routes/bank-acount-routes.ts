import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeBankAccountController } from '../factories/controllers/bank-account/add-bank-account/add-bank-account-controller-factory'
import { makeBankCardController } from '../factories/controllers/bank-card/add-bank-card/add-bank-card-controller-factory'
import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decorator-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  router.post('/bank-accounts', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLogControllerDecorator(makeBankAccountController())))
  router.post('/bank-accounts/:bankAccountId/bank-cards', adaptRoute(makeLogControllerDecorator(makeBankCardController())))
}