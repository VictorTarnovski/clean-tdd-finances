import { BankCardModel } from "../models/bank-card"

export interface AddBankCardModel {
    number: number,
    flag: string,
    expiresAt: string
}

export interface AddBankCard {
    add(bankCard: AddBankCardModel): Promise<BankCardModel>
}