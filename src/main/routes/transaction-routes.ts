import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { auth } from '@/main/middlewares/auth'
import { makeAddTransactionController } from '../factories/controllers/transactions/add-transaction/add-transaction-controller-factory'
import { makeLoadTransactionsByBankAccountController } from '../factories/controllers/transactions/load-transacations-by-bank-account/load-transactions-by-bank-account-controller-factory'

export default (router: Router): void => {

  router.post('/transactions', auth, 
  adaptRoute(makeLogControllerDecorator(makeAddTransactionController()))
  )

  router.get('/bank-accounts/:bankAccountId/transactions', auth, adaptRoute(
    makeLogControllerDecorator(makeLoadTransactionsByBankAccountController())
  ))
}