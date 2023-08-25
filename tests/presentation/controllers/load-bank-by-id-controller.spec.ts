import { LoadBankByIdController } from "@/presentation/controllers/bank/load-bank-by-id-controller"
import { serverError } from "@/presentation/helpers/http/http-helper"
import { mockLoadBankById } from "../mocks"

const makeSut = () => {
  const loadBankByIdStub = mockLoadBankById()
  const sut = new LoadBankByIdController(loadBankByIdStub)
  return {
    sut,
    loadBankByIdStub
  }
}  
describe('LoadBankById Controller', () => {

    test('Should call LoadBankById with correct id', async () => {
      const { sut, loadBankByIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadBankByIdStub, 'load')
      await sut.handle({ bankId: 'any_id' })
      expect(loadSpy).toHaveBeenCalledTimes(1)
      expect(loadSpy).toHaveBeenCalledWith('any_id')
    })
      
    test('Should return 500 if LoadBankById throw', async () => {
      const { sut, loadBankByIdStub } = makeSut()
      const error = new Error()
      jest.spyOn(loadBankByIdStub, 'load').mockImplementationOnce(async () => { throw error })
      const httpResponse = await sut.handle({ bankId: 'any_id' })
      expect(httpResponse).toEqual(serverError(error))
    })
})