import { BankModel } from "./bank"
import { BankCardModel } from "./bank-card"

export type BankAccountModel = {
    id: string
    number: number
    currency: string
    balance: number
    accountId: string
    cards: BankCardModel[],
    bank: BankModel
}