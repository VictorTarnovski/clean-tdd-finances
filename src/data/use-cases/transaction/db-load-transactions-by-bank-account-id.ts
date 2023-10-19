import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"
import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"
import { LoadTransactionsByBankAccount} from "@/domain/use-cases/transaction/load-transactions-by-bank-account-id"
import { LoadTransactionsByBankAccountIdRepository } from "@/data/protocols/db"

export class DbLoadTransactionsByBankAccount implements LoadTransactionsByBankAccount {
  constructor(private readonly loadTransactionsByBankAccountIdRepository: LoadTransactionsByBankAccountIdRepository) {}
  async load(bankAccountId: string): Promise<TransactionModel[]> {
    const transactions = await this.loadTransactionsByBankAccountIdRepository.loadByBankAccountId(bankAccountId)
    return transactions
  }
}