import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeBankAccountController } from '../factories/controllers/bank-account/bank-account-controller-factory'
import { makeBankCardController } from '../factories/controllers/bank-card/bank-card-controller-factory'
import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decorator-factory'

export default (router: Router): void => {
    router.post('/bank-accounts', adaptRoute(makeLogControllerDecorator(makeBankAccountController())))
    router.post('/bank-accounts/:bankAccountId/bank-cards', adaptRoute(makeLogControllerDecorator(makeBankCardController())))
}