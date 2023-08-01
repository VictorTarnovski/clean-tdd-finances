import { AddBankCard, AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"
import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"
import { BankCardModel } from "@/domain/models/bank-card"
import { mockBankCardModel } from "@/domain/tests"

export const mockAddBankCard = () => {
  class AddBankCardStub implements AddBankCard {
    async add(bankCard: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
      return mockBankCardModel()
    }
  }
  return new AddBankCardStub()
}

export const mockLoadBankCardById = () => {
  class LoadBankCardByIdStub implements LoadBankCardById {
    async load(bankCardId: string): Promise<BankCardModel> {
      return mockBankCardModel()
    }
  }
  return new LoadBankCardByIdStub()
}