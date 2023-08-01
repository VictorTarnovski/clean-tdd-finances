import { LoadBankCardByIdRepository } from "@/data/protocols/db/bank-card/load-bank-card-by-id-repository"
import { DbLoadBankCardById } from "@/data/use-cases/bank-card/load-bank-card-by-id/db-load-bank-card-by-id"
import { mockLoadBankCardByIdRepository } from "@/data/tests"

type SutTypes = {
  sut: DbLoadBankCardById
  loadBankCardByIdRepositoryStub: LoadBankCardByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBankCardByIdRepositoryStub = mockLoadBankCardByIdRepository()
  const sut = new DbLoadBankCardById(loadBankCardByIdRepositoryStub)
  return {
    sut,
    loadBankCardByIdRepositoryStub
  }
}


describe('DbLoadBankCardById UseCase', () => {
   test('Should call LoadBankCardByIdRepository with correct id', async () => {
    const { sut, loadBankCardByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBankCardByIdRepositoryStub, 'loadById')
    await sut.load('any_bank_card_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_bank_card_id')
   })
})