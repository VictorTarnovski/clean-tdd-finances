import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { DbAddAccount } from "../../../../data/use-cases/add-account/db-add-account"
import { MongoAccountRepository } from "../../../../infra/db/mongodb/account/mongo-account-repository"
import { AddAccount } from "../../../../domain/use-cases/add-account"


export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bcrytAdapter = new BcryptAdapter(salt)
    const accountRepository = new MongoAccountRepository()
    return new DbAddAccount(bcrytAdapter, accountRepository, accountRepository)
}