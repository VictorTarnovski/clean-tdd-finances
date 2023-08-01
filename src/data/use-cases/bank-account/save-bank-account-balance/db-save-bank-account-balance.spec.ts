import { SaveBalanceRepository } from "@/data/protocols/db/bank-account/save-balance-repository"
import { DbSaveBankAccountBalance } from "@/data/use-cases/bank-account/save-bank-account-balance/db-save-bank-account-balance"
import { mockSaveBalanceRepository } from "@/data/tests"

type SutTypes = {
  sut: DbSaveBankAccountBalance
  saveBalanceRepository: SaveBalanceRepository
}

const makeSut = (): SutTypes => {
  const saveBalanceRepository = mockSaveBalanceRepository()
  const sut = new DbSaveBankAccountBalance(saveBalanceRepository)
  return {
    sut,
    saveBalanceRepository
  }
}


describe('DbSaveBankAccountBalance UseCase', () => {
   test('Should call SaveBalanceRepository with correct values', async () => {
    const { sut, saveBalanceRepository } = makeSut()
    const saveSpy = jest.spyOn(saveBalanceRepository, 'saveBalance')
    await sut.save(0, 'any_bank_account_id')
    expect(saveSpy).toHaveBeenCalledWith(0, 'any_bank_account_id')
   })
})