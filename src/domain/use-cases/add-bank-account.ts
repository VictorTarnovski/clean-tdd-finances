import { BankAccountModel } from "../models/bank-account"

export interface AddBankAccountModel {
    number: number
}

export interface AddBankAccount {
    add(bankAccount: AddBankAccountModel): Promise<BankAccountModel>
}