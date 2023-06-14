import { BankCardModel } from "../../../domain/models/bank-card"
import { AddBankCardModel } from "../../../domain/use-cases/add-bank-card"
import { AddBankCardRepository } from "../../protocols/add-bank-card-repository"
import { DbAddBankCard } from "./db-add-bank-card"

const makeAddBankCardRepository = () => {
    
    class AddBankCardRepositoryStub implements AddBankCardRepository {
        add(bankCardData: AddBankCardModel): Promise<BankCardModel> {
            const fakeBankCard = {
                id: 'valid_id',
                number: 1,
                flag: 'valid_flag',
                expiresAt: '2023-06-14'
            }
            return new Promise(resolve => resolve(fakeBankCard))
        }
    }

    return new AddBankCardRepositoryStub()
}
const makeSut = () => {
    const addBankCardRepository = makeAddBankCardRepository()
    const sut = new DbAddBankCard(addBankCardRepository)
    return {
        sut,
        addBankCardRepository
    }
}

describe('DbAddBankCard Usecase', () => {

    test('Should call AddBankCardRepository with correct values', async () => {
        const { sut, addBankCardRepository } = makeSut()
        const addSpy = jest.spyOn(addBankCardRepository, 'add')
        const bankCardData = {
            number: 1,
            flag: 'valid_flag',
            expiresAt: '2023-06-14'
        }
        await sut.add(bankCardData)
        expect(addSpy).toBeCalledWith({
            number: 1,
            flag: 'valid_flag',
            expiresAt: '2023-06-14'
        })
    })
})