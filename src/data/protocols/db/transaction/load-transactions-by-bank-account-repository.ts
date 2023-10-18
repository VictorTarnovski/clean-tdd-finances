import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccountRepository {
  loadByBankAccountId(bankAccountId: string): Promise<TransactionModel[]>
}