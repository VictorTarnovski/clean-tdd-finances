import { BankAccountModel } from "../../../../domain/models/bank-account"
import { LoadBankAccountByIdController } from "./load-bank-account-by-id-controller"
import { LoadBankAccountById } from "../../../../domain/use-cases/load-bank-account-by-id"

const makeBankAccount = (): BankAccountModel => ({
  id: 'valid_id',
  number: 123456789,
  currency: 'USD',
  balance: 0,
  cards: []
})

describe('LoadBankAccountById Controller', () => {
  test('Should call LoadBankAccountById with correct id', async () => {
    class LoadBankAccountByIdStub implements LoadBankAccountById {
      async load(): Promise<BankAccountModel | null> {
        return makeBankAccount()
      }
    }
    const loadBankAccountByIdStub = new LoadBankAccountByIdStub()
    const loadByIdSpy = jest.spyOn(loadBankAccountByIdStub, 'load')
    const sut = new LoadBankAccountByIdController(loadBankAccountByIdStub)
    await sut.handle({ params: { bankAccountId: 'valid_id'}})
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_id')
  })
})