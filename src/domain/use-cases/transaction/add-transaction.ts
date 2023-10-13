import { TransactionModel } from "@/domain/models/transaction"

export type AddTransactionModel = 
    Omit<Omit<Omit<TransactionModel, "id">, "bankAccount">, "bankCard">
    & { bankAccountId: string, bankCardId?: string }

export interface AddTransaction {
    add(transaction: AddTransactionModel): Promise<TransactionModel>
}