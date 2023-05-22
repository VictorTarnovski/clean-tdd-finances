import request from 'supertest'
import app from '../config/app'

describe('Bank Account Routes', () => {

    test('Should return an account on sucess', async() => {
        await request(app)
        .post('/api/bank-accounts')
        .send({
            number: 1234567890,
            currency: 'USD'
        })
        .expect(200)
    })
})