import { BankAccountModel } from "@/domain/models/bank-account"

export interface LoadBankAccountById {
    load(bankAccountId: string): Promise<BankAccountModel | null>
}