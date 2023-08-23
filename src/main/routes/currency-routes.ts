import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoadCurrenciesController } from '@/main/factories/controllers/currency/load-currencies-controller-factory'
import { auth } from '@/main/middlewares/auth'

export default async (router: Router): Promise<void> => {
  router.get('/currencies', auth, adaptRoute(makeLogControllerDecorator(makeLoadCurrenciesController())))
}