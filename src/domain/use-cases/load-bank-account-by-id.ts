import { BankAccountModel } from "../models/bank-account"

export interface LoadBankAccountById {
    load(bankAccountId: string): Promise<BankAccountModel | null>
}