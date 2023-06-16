import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeBankAccountController } from '../factories/bank-account'
import { makeBankCardController } from '../factories/bank-card'

export default (router: Router): void => {
    router.post('/bank-accounts', adaptRoute(makeBankAccountController()))
    router.post('/bank-accounts/:bankAccountId/bank-cards', adaptRoute(makeBankCardController()))
}