import { TransactionModel } from "@/domain/models/transaction"
import { mockIncomeTransactionModel } from "../../domain/mocks"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { LoadTransactionsByBankAccountRepository } from "@/data/protocols/db/transaction/load-transactions-by-bank-account-repository"

export const mockAddTransactionRepository = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
      return mockIncomeTransactionModel()
    }
  }

  return new AddTransactionRepositoryStub()
}

export const mockLoadTransactionsByBankAccountRepository = (): LoadTransactionsByBankAccountRepository => {
  class LoadTransactionsByBankAccountRepositoryStub implements LoadTransactionsByBankAccountRepository {
    async loadByBankAccountId(bankAccountId: string): Promise<TransactionModel[] | []> {
      return []
    }
  }

  return new LoadTransactionsByBankAccountRepositoryStub()
}