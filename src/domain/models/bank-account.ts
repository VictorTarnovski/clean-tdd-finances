import { BankCardModel } from "./bank-card"

export type BankAccountModel = {
    id: string,
    number: number,
    currency: string,
    balance: number,
    cards: BankCardModel[]
    accountId: string
}