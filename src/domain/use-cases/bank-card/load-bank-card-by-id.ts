import { BankCardModel } from "@/domain/models/bank-card"

export interface LoadBankCardById {
    load(bankCardId: string, bankAccountId: string): Promise<BankCardModel | null>
}