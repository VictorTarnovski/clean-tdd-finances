import { HttpService, RequestModel, ResponseModel } from "../../../http/protocols/http-service"
import { FirebaseAccountRepository } from "./account"

describe('FirebaseAccountRepository', () => {

    const makeHttpServiceStub = () => {
        class HttpServiceStub implements HttpService {
            async post({ url, requestBody, requestParams, requestHeaders }: RequestModel): Promise<ResponseModel> {
                return { statusCode: 200 }
            }
        }
        return new HttpServiceStub()
    }

    const makeSut = () => {
        const httpServiceStub = makeHttpServiceStub()
        const sut = new FirebaseAccountRepository(httpServiceStub)
        return {
            sut,
            httpServiceStub
        }
    }
    
    test('Should return an account on sucess', async () => {
        const { sut, httpServiceStub } = makeSut()
        jest.spyOn(httpServiceStub, 'post').mockImplementationOnce(async () => {
            return { statusCode: 200, body: '1' }
        })
        const bankAccount = await sut.add({ 
            number: 123,
            currency: 'USD'
        })
        expect(bankAccount).toBeTruthy()
        expect(bankAccount.number).toBe(123)
        expect(bankAccount.id).toBe('1')
    }) 
})