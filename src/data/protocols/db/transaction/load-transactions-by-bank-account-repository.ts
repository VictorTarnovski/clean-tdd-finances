import { TransactionModel } from "@/domain/models/transaction"

export interface LoadTransactionsByBankAccountRepository {
    loadByBankAccount(bankAccountId: string): Promise<TransactionModel[] | []>
}