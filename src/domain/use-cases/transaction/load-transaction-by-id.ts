import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionById {
    load(transactionId: string): Promise<TransactionModel>
}