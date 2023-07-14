import { BankAccountModel } from "../models/bank-account"

export interface AddBankAccountModel {
    number: number,
    currency: string,
    balance?: number
}

export interface AddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<BankAccountModel>
}