import { AccountModel, AddAccountModel, AddAccount, Encrypter } from "./db-add-account-protocols"

export class DbAaddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    constructor(encrypter: Encrypter) {
        this.encrypter = encrypter
    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve({
            id: 'mocked_id',
            email: 'mocked_email',
            name: 'mocked_name',
            password: 'mocked_password',
        }))
    }
}