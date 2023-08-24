import { LoadBanksController } from "@/presentation/controllers/bank/load-banks-controller"
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
                    
})