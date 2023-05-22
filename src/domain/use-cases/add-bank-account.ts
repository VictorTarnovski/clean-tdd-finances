import { BankAccountModel } from "../models/bank-account"

export interface AddBankAccountModel {
    number: number,
    currency: string
}

export interface AddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<BankAccountModel>
}