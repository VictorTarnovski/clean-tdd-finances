import { BankCardModel } from "@/domain/models/bank-card"
import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"
import { LoadBankCardByIdRepository } from "@/data/protocols/db/bank-card/load-bank-card-by-id-repository"

export class DbLoadBankCardById implements LoadBankCardById {
  constructor(private readonly loadBankCardByIdRepository: LoadBankCardByIdRepository) {}
  async load(bankCardId: string, bankAccountId: string): Promise<BankCardModel | null> {
    const bankCard = await this.loadBankCardByIdRepository.loadById(bankCardId, bankAccountId)
    if(!bankCard) return null
    return bankCard
  }
}