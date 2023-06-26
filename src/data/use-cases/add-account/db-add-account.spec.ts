import { Encrypter } from "../../protocols/encrypter"
import { DbAaddAccount } from "./db-add-account"

const makeEncrypterStub = () => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return 'hashed_password'
        }
    }
    return new EncrypterStub()
}

interface SutTypes {
    sut: DbAaddAccount,
    encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypterStub()
    const sut = new DbAaddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}
describe('DbAaddAccount Usecase', () => {
                    
    test('Should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
                    
})