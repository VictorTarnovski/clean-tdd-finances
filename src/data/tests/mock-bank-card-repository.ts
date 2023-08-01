import { AddBankCardRepository } from "../protocols/db/bank-card/add-bank-card-repository"
import { BankCardModel } from "@/domain/models/bank-card"
import { mockBankCardModel } from "@/domain/tests"
import { AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"

export const mockAddBankCardRepository = () => {
  class AddBankCardRepositoryStub implements AddBankCardRepository {
    async add(bankCardData: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
      return mockBankCardModel()
    }
  }

  return new AddBankCardRepositoryStub()
}