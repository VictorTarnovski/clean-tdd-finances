import { AddBankCard, AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"
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