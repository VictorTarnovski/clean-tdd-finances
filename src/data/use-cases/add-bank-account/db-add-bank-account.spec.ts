import { BankAccountModel } from "../../../domain/models/bank-account"
import { AddBankAccountModel } from "../../../domain/use-cases/add-bank-account"
import { AddBankAccountRepository } from "../../protocols/add-bank-account-repository"
import { DbAddBankAccount } from "./db-add-bank-account"

const makeAddBankAccountRepository = () => {
    
    class AddBankAccountRepositoryStub implements AddBankAccountRepository {
        add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
            const fakeBankAccount = {
                id: 'valid_id',
                number: 1
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

    test('Should call AddBankAccountRepository with correct values', async () => {
        const { sut, addBankAccountRepository } = makeSut()
        const addSpy = jest.spyOn(addBankAccountRepository, 'add')
        const bankAccountData = {
            number: 1
        }
        await sut.add(bankAccountData)
        expect(addSpy).toBeCalledWith({
            number: 1
        })
    })
})