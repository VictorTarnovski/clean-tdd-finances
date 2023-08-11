import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddBankAccountController } from '@/main/factories/controllers/bank-account/add-bank-account-controller-factory'
import { makeBankCardController } from '@/main/factories/controllers/bank-card/add-bank-card/add-bank-card-controller-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoadBankAccountByIdController } from '@/main/factories/controllers/bank-account/load-bank-account-by-id-controller-factory'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/bank-accounts',
    auth,
    adaptRoute(makeLogControllerDecorator(makeAddBankAccountController()
    )
    )
  )

  router.post('/bank-accounts/:bankAccountId/bank-cards',
    auth,
    adaptRoute(makeLogControllerDecorator(makeBankCardController()
    )
    )
  )
  router.get('/bank-accounts/:bankAccountId',
    auth,
    adaptRoute(makeLogControllerDecorator(makeLoadBankAccountByIdController()
    )
    )
  )
}