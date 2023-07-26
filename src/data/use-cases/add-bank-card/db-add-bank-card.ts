import { BankCardModel } from "@/domain/models/bank-card"
import { AddBankCard, AddBankCardModel } from "@/domain/use-cases/add-bank-card"
import { AddBankCardRepository } from "@/data/protocols/db/bank-card/add-bank-card-repository"

export class DbAddBankCard implements AddBankCard {
    constructor(private readonly addBankCardRepository: AddBankCardRepository) {}

    async add(bankCardData: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
        const bankCard = await this.addBankCardRepository.add(bankCardData, bankAccountId)
        return bankCard
    }
}