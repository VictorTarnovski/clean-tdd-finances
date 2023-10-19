import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { LoadTransactionsByBankAccountId } from "@/domain/use-cases/transaction/load-transactions-by-bank-account-id"
import { LoadTransactionsByBankAccountIdRepository } from "@/data/protocols/db"

export class DbLoadTransactionsByBankAccountId implements LoadTransactionsByBankAccountId {
  constructor(private readonly loadTransactionsByBankAccountIdRepository: LoadTransactionsByBankAccountIdRepository) {}
  async loadById(bankAccountId: string): Promise<TransactionModel[]> {
    const transactions = await this.loadTransactionsByBankAccountIdRepository.loadByBankAccountId(bankAccountId)
    return transactions
  }
}