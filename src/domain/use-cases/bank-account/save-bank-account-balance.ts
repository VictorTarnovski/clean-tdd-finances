import { BankAccountModel } from "@/domain/models/bank-account"

export interface SaveBankAccountBalance {
    save(balance: number): Promise<BankAccountModel>
}