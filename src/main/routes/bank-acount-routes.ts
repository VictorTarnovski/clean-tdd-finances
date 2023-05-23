import { Router } from 'express'
import { makeBankAccountController } from '../factories/bank-account'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
    router.post('/bank-accounts', adaptRoute(makeBankAccountController()))
}