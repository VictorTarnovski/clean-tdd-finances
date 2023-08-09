import { AccountModel } from "@/domain/models"
import { AddAccount, AddAccountModel } from "@/domain/use-cases"
import { Hasher } from "@/data/protocols/criptography"
import { AddAccountRepository, LoadAccountByEmailRepository } from "@/data/protocols/db"

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher, 
        private readonly addAccountRepository: AddAccountRepository, 
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}
    async add(accountData: AddAccountModel): Promise<AccountModel | null> {
        const alreadyExists = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        if (alreadyExists) {
            return null
        }
        const hashedPassword = await this.hasher.hash(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
        return account
    }
}