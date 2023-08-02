import { LoadBankCardByIdRepository } from "@/data/protocols/db/bank-card/load-bank-card-by-id-repository"
import { DbLoadBankCardById } from "@/data/use-cases/bank-card/load-bank-card-by-id/db-load-bank-card-by-id"
import { mockLoadBankCardByIdRepository } from "@/data/tests"
import { mockBankCardModel } from "@/domain/tests"

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
    await sut.load('any_bank_card_id', 'any_bank_account_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_bank_card_id', 'any_bank_account_id')
  })

  test('Should return null if LoadBankCardByIdRepository returns null', async () => {
    const { sut, loadBankCardByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankCardByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => null)
    const bankCard = await sut.load('any_bank_card_id', 'any_bank_account_id')
    expect(bankCard).toBeNull()
  })

  test('Should throw if LoadBankCardByIdRepository throws', async () => {
    const { sut, loadBankCardByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBankCardByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => { throw new Error() })
    const promise = sut.load('any_bank_card_id', 'any_bank_account_id')
    expect(promise).rejects.toThrow()
  })

  test('Should return a bankCard on LoadBankCardByIdRepository success', async () => {
    const { sut } = makeSut()
    const bankCard = await sut.load('any_bank_card_id', 'any_bank_account_id')
    expect(bankCard).toEqual(mockBankCardModel())
  })
})