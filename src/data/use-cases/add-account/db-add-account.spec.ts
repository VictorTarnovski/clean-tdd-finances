import { DbAddAccount } from "./db-add-account"
import { AccountModel, AddAccountModel, Hasher, AddAccountRepository } from "./db-add-account-protocols"

const makeHasherStub = (): Hasher => {
    class HasherStub implements Hasher {
        async hash(value: string): Promise<string> {
            return 'hashed_password'
        }
    }
    return new HasherStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepositoryStub {
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                password: 'hashed_password'
            }
            return fakeAccount
        }
    }
    return new AddAccountRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount,
    HasherStub: Hasher,
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
    const HasherStub = makeHasherStub()
    const addAccountRepositoryStub = makeAddAccountRepositoryStub()
    const sut = new DbAddAccount(HasherStub, addAccountRepositoryStub)
    return {
        sut,
        HasherStub,
        addAccountRepositoryStub
    }
}
describe('DbAddAccount Usecase', () => {
                    
    test('Should call Hasher with correct password', async () => {
        const { sut, HasherStub } = makeSut()
        const hashSpy = jest.spyOn(HasherStub, 'hash')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(hashSpy).toHaveBeenCalledWith('valid_password')
    })

    test('Should throw if Hasher throws', async () => {
        const { sut, HasherStub } = makeSut()
        jest.spyOn(HasherStub, 'hash').mockRejectedValueOnce(new Error())
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on sucess', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const account = await sut.add(accountData)
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })
                    
})