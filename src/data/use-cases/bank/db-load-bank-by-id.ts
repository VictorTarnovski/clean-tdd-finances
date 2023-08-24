import { LoadBankByIdRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import { LoadBankById } from "@/domain/use-cases"

export class DbLoadBankById implements LoadBankById {
  constructor(private readonly loadBanksRepository: LoadBankByIdRepository) {}
  async load(bankId: string): Promise<BankModel | null> {
    const bank = await this.loadBanksRepository.loadBankById(bankId)
    return bank
  }
}