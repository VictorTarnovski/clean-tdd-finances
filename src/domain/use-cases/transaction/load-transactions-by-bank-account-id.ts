import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccount {
  load(bankAccountId: string): Promise<TransactionModel[]>
}