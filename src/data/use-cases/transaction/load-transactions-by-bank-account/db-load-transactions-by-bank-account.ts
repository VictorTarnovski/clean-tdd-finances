import { TransactionModel } from "@/domain/models/transaction"
import { LoadTransactionsByBankAccount } from "@/domain/use-cases/transaction/load-transactions-by-bank-account"
import { LoadTransactionsByBankAccountRepository } from "@/data/protocols/db/transaction/load-transactions-by-bank-account-repository"

export class DbLoadTransactionsByBankAccount implements LoadTransactionsByBankAccount {
  constructor(private readonly loadTransactionsByBankAccountRepository: LoadTransactionsByBankAccountRepository) { }

  async load(bankAccountId: string): Promise<TransactionModel[]> {
    const transactions = await this.loadTransactionsByBankAccountRepository.loadByBankAccount(bankAccountId)
    return transactions
  }
}