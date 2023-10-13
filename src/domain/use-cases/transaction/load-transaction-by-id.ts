import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionById {
    loadById(transactionId: string): Promise<TransactionModel | null>
}