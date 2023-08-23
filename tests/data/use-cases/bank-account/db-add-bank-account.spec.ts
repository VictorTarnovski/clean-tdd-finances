import { DbAddBankAccount } from "@/data/use-cases"
import { mockAddBankAccountModel } from "../../../domain/mocks"
import { mockAddBankAccountRepository } from "../../mocks"

const makeSut = () => {
    const addBankAccountRepository = mockAddBankAccountRepository()
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
        await sut.add(mockAddBankAccountModel())
        expect(addSpy).toBeCalledWith({ number: mockAddBankAccountModel().number, currency: mockAddBankAccountModel().currency, balance: mockAddBankAccountModel().balance, cards: mockAddBankAccountModel().cards, accountId: mockAddBankAccountModel().accountId })
    })

    test('Should thorw if AddBankAccountRepository thorws', async () => {
        const { sut, addBankAccountRepository } = makeSut()
        jest.spyOn(addBankAccountRepository, 'add').mockImplementationOnce(async () => { throw new Error() })
        const promise = sut.add(mockAddBankAccountModel())
        expect(promise).rejects.toThrow()
    })
})