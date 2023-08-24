import { LoadBanksController } from "@/presentation/controllers/bank/load-banks-controller"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { mockBankModels } from "../../domain/mocks"
import { mockLoadBanks } from "../mocks"

const makeSut = () => {
  const loadBanksStub = mockLoadBanks()
  const sut = new LoadBanksController(loadBanksStub)
  return {
    sut,
    loadBanksStub
  }
}  
describe('LoadBanks Controller', () => {

    test('Should call LoadBanks', async () => {
      const { sut, loadBanksStub } = makeSut()
      const loadSpy = jest.spyOn(loadBanksStub, 'load')
      await sut.handle({})
      expect(loadSpy).toHaveBeenCalledTimes(1)
    })

    test('Should return 500 if loadBanks throw', async () => {
      const { sut, loadBanksStub } = makeSut()
      const error = new Error()
      jest.spyOn(loadBanksStub, 'load').mockImplementationOnce(async () => { throw error })
      const httpResponse = await sut.handle({})
      expect(httpResponse).toEqual(serverError(error))
    })

    test('Should return 200 on success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({})
      expect(httpResponse).toEqual(ok(mockBankModels()))
    })
                    
})