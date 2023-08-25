import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoadBanksController } from '@/main/factories/controllers/bank/load-banks-controller-factory'
import { makeLoadBankByIdController } from '@/main/factories/controllers/bank/load-bank-by-id-controller-factory'
import { auth } from '@/main/middlewares/auth'

export default async (router: Router): Promise<void> => {
  router.get('/banks', auth, adaptRoute(makeLogControllerDecorator(makeLoadBanksController())))

  router.get('/banks/:bankId', auth, adaptRoute(makeLogControllerDecorator(makeLoadBankByIdController())))
}