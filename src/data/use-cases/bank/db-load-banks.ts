import { LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import { LoadBanks } from "@/domain/use-cases"

export class DbLoadBanks implements LoadBanks {
  constructor(private readonly loadBanksRepository: LoadBanksRepository) {}
  async load(): Promise<BankModel[]> {
    const banks = await this.loadBanksRepository.loadBanks()
    return banks
  }
}