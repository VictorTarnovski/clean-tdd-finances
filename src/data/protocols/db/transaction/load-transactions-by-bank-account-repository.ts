import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccountIdRepository {
  loadByBankAccountId(bankAccountId: string): Promise<TransactionModel[]>
}