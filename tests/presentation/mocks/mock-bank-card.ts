import { AddBankCard, AddBankCardModel, LoadBankCardById } from "@/domain/use-cases"
import { BankCardModel } from "@/domain/models/bank-card"
import { mockBankCardModel } from "../../domain/mocks"

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