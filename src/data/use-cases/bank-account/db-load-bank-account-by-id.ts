import { BankAccountModel } from "@/domain/models/bank-account";
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadBankAccountByIdRepository } from "@/data/protocols/db/bank-account/load-bank-account-by-id-repository"

export class DbLoadBankAccountById implements LoadBankAccountById {
  constructor(private readonly loadBankAccountByIdRepository: LoadBankAccountByIdRepository) {}
  async load(bankAccountId: string): Promise<BankAccountModel | null> {
    const bankAccount = await this.loadBankAccountByIdRepository.loadById(bankAccountId)
    if(!bankAccount) return null
    return bankAccount
  }
}