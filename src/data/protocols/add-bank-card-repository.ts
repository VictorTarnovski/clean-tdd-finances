import { BankCardModel } from "../../domain/models/bank-card"
import { AddBankCardModel } from "../../domain/use-cases/add-bank-card"

export interface AddBankCardRepository {
    add(bankCardData: AddBankCardModel, bankAccountId: string): Promise<BankCardModel>
}