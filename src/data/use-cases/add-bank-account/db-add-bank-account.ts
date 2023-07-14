import { BankAccountModel } from "../../../domain/models/bank-account"
import { AddBankAccount, AddBankAccountModel } from "../../../domain/use-cases/add-bank-account"
import { AddBankAccountRepository } from "../../protocols/db/add-bank-account-repository"

export class DbAddBankAccount implements AddBankAccount {
    private readonly addBankAccountRepository: AddBankAccountRepository
    constructor(addBankAccountRepository: AddBankAccountRepository) {
        this.addBankAccountRepository = addBankAccountRepository
    }

    async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
        const bankAccount = await this.addBankAccountRepository.add(Object.assign({}, bankAccountData, {balance: bankAccountData.balance ? bankAccountData.balance : 0}))
        return bankAccount
    }
}