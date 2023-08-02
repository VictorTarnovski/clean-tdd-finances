import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccountId {
    load(bankAccountId: string): Promise<TransactionModel[]>
}