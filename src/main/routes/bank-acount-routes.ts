import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddBankAccountController } from '../factories/controllers/bank-account/add-bank-account/add-bank-account-controller-factory'
import { makeBankCardController } from '../factories/controllers/bank-card/add-bank-card/add-bank-card-controller-factory'
import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decorator-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadBankAccountByIdController } from '../factories/controllers/bank-account/load-bank-account-by-id/load-bank-account-by-id-controller-factory'

export default (router: Router): void => {
  router.post('/bank-accounts',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeLogControllerDecorator(makeAddBankAccountController()
    )
    )
  )

  router.post('/bank-accounts/:bankAccountId/bank-cards',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeLogControllerDecorator(makeBankCardController()
    )
    )
  )
  router.get('/bank-accounts/:bankAccountId',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeLogControllerDecorator(makeLoadBankAccountByIdController()
    )
    )
  )
}