import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankCard {
    load(bankCardId: string): Promise<TransactionModel[]>
}