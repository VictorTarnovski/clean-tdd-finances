import { BankCardModel } from "@/domain/models/bank-card"
import { mockBankCardModel } from "@/domain/tests"
import { AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"
import { LoadBankCardByIdRepository } from "@/data/protocols/db/bank-card/load-bank-card-by-id-repository"
import { AddBankCardRepository } from "@/data/protocols/db/bank-card/add-bank-card-repository"

export const mockAddBankCardRepository = () => {
  class AddBankCardRepositoryStub implements AddBankCardRepository {
    async add(bankCardData: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
      return mockBankCardModel()
    }
  }

  return new AddBankCardRepositoryStub()
}

export const mockLoadBankCardByIdRepository = (): LoadBankCardByIdRepository => {
  class LoadBankCardByIdRepositoryStub implements LoadBankCardByIdRepository {
    async loadById(id: string): Promise<BankCardModel | null> {
      return mockBankCardModel()
    }
  }
  return new LoadBankCardByIdRepositoryStub()
}