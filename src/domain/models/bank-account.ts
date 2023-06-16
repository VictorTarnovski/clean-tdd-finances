import { BankCardModel } from "./bank-card"

export interface BankAccountModel {
    id: string,
    number: number,
    currency: string
    cards: BankCardModel[]
}