import { BankAccountModel } from "../../../../domain/models/bank-account"

export interface LoadBankAccountByIdRepository {
  loadById(id: string): Promise<BankAccountModel | null>
}