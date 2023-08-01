import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankCardId {
    load(bankCardId: string): Promise<TransactionModel[]>
}