import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccountId {
  loadById(bankAccountId: string): Promise<TransactionModel[]>
}