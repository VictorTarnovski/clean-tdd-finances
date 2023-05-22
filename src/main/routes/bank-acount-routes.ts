import { Router, Request, Response } from 'express'

export default (router: Router): void => {
    router.post('/bank-accounts', (req: Request, res: Response) => {
        res.json('ok')
    })
}