import { BankAccountModel } from "@/domain/models/bank-account"

export type AddBankAccountModel = {
    number: number
    currency: string
    balance: number
    cards: []
    accountId: string
}

export interface AddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<BankAccountModel>
}