import { BankCardModel } from "@/domain/models/bank-card"

export type AddBankCardModel = Omit<BankCardModel, 'id'>

export interface AddBankCard {
    add(bankCard: AddBankCardModel, bankAccountId: string): Promise<BankCardModel>
}