import { TransactionModel } from "@/domain/models/transaction"

export type AddTransactionModel = Omit<TransactionModel, 'id'>

export interface AddTransaction {
    add(transaction: AddTransactionModel): Promise<TransactionModel>
}