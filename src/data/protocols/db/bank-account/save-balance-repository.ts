import { BankAccountModel } from "@/domain/models/bank-account"

export interface SaveBalanceRepository {
  saveBalance(balance: number, bankAccountId: string): Promise<BankAccountModel>
}