import { BankCardModel } from "../../../domain/models/bank-card"
import { AddBankCard, AddBankCardModel } from "../../../domain/use-cases/add-bank-card"
import { AddBankCardRepository } from "../../protocols/add-bank-card-repository"

export class DbAddBankCard implements AddBankCard {
    private readonly addBankCardRepository: AddBankCardRepository
    constructor(addBankCardRepository: AddBankCardRepository) {
        this.addBankCardRepository = addBankCardRepository
    }

    async add(bankCardData: AddBankCardModel): Promise<BankCardModel> {
        const bankCard = await this.addBankCardRepository.add(bankCardData)
        return bankCard
    }
}