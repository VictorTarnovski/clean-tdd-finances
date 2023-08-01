import { TransactionModel } from "@/domain/models/transaction"
import { AddTransactionModel } from "@/domain/use-cases/add-transaction"

export interface AddTransactionRepository {
    add(transactionData: AddTransactionModel): Promise<TransactionModel>
}