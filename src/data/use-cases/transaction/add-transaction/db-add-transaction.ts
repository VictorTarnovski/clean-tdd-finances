import { TransactionModel } from "@/domain/models/transaction"
import { AddTransaction, AddTransactionModel } from "@/domain/use-cases/add-transaction"
import { AddTransactionRepository } from "@/data/protocols/db/transaction/add-transaction-repository"

export class DbAddTransaction implements AddTransaction {
    constructor(private readonly addTransactionRepository: AddTransactionRepository) {}

    async add(transactionData: AddTransactionModel): Promise<TransactionModel> {
        const transaction = await this.addTransactionRepository.add(transactionData)
        return transaction
    }
}