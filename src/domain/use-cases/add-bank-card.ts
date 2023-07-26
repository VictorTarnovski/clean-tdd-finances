import { BankCardModel } from "@/domain/models/bank-card"

export type AddBankCardModel = {
    number: number,
    flag: string,
    expiresAt: string
}

export interface AddBankCard {
    add(bankCard: AddBankCardModel, bankAccountId: string): Promise<BankCardModel>
}