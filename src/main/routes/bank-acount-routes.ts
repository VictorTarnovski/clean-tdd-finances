import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeBankAccountController } from '../factories/bank-account/bank-account-factory'
import { makeBankCardController } from '../factories/bank-card/bank-card-factory'

export default (router: Router): void => {
    router.post('/bank-accounts', adaptRoute(makeBankAccountController()))
    router.post('/bank-accounts/:bankAccountId/bank-cards', adaptRoute(makeBankCardController()))
}