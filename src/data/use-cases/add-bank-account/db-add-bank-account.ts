import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccount, AddBankAccountModel } from "@/domain/use-cases/add-bank-account"
import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"

export class DbAddBankAccount implements AddBankAccount {
    constructor(private readonly addBankAccountRepository: AddBankAccountRepository) {}

    async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
        const bankAccount = await this.addBankAccountRepository.add(Object.assign({}, bankAccountData, {balance: bankAccountData.balance ? bankAccountData.balance : 0}))
        return bankAccount
    }
}