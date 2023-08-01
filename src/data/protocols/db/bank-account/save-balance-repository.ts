import { BankAccountModel } from "@/domain/models/bank-account"

export interface SaveBalanceRepository {
  save(balance: number, bankAccountId: string): Promise<BankAccountModel>
}