import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccountModel } from "@/domain/use-cases/add-bank-account"
import { AddBankAccountRepository } from "@/data/protocols/db/bank-account/add-bank-account-repository"
import { DbAddBankAccount } from "./db-add-bank-account"

const makeAddBankAccountRepository = () => {
    
    class AddBankAccountRepositoryStub implements AddBankAccountRepository {
        add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
            const fakeBankAccount = {
                id: 'valid_id',
                number: 1,
                currency: 'USD',
                balance: 0,
                cards: [],
                accountId: 'valid_account_id'
            }
            return new Promise(resolve => resolve(fakeBankAccount))
        }
    }

    return new AddBankAccountRepositoryStub()
}
const makeSut = () => {
    const addBankAccountRepository = makeAddBankAccountRepository()
    const sut = new DbAddBankAccount(addBankAccountRepository)
    return {
        sut,
        addBankAccountRepository
    }
}

describe('DbAddBankAccount Usecase', () => {

    test('Should call AddBankAccountRepository with balance 0', async () => {
        const { sut, addBankAccountRepository } = makeSut()
        const addSpy = jest.spyOn(addBankAccountRepository, 'add')
        const bankAccountData = {
            number: 1,
            currency: 'USD'
        }
        await sut.add(bankAccountData)
        expect(addSpy).toBeCalledWith({ number: 1, currency: 'USD', balance: 0 })
    })

    test('Should call AddBankAccountRepository with provided balance', async () => {
        const { sut, addBankAccountRepository } = makeSut()
        const addSpy = jest.spyOn(addBankAccountRepository, 'add')
        const bankAccountData = {
            number: 1,
            currency: 'USD',
            balance: 123.25
        }
        await sut.add(bankAccountData)
        expect(addSpy).toBeCalledWith({ number: 1, currency: 'USD', balance: 123.25 })
    })
})