import { AccountModel, AuthenticationModel, LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAcessTokenRepository } from "../authentication/db-authentication-protocols"
import { DbAuthentication } from "./db-authentication"

const makeFakeAuthentication = (): AuthenticationModel => ({email: 'any_mail@mail.com', password: 'any_password'})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository { 
        async load(email:string): Promise<AccountModel | null> {
            const account: AccountModel = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email',
                password: 'hashed_password'
            }
            return account
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return true
        }
    }
    return new HashComparerStub
}

const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return 'fake_token'
        }
    }
    return new EncrypterStub()
}

const makeUpdateAcessTokenRepository = (): UpdateAcessTokenRepository => {
    class UpdateAcessTokenRepositoryStub implements UpdateAcessTokenRepository { 
        async updateAcessToken(id: string, token: string): Promise<void> {
            return 
        }
    }
    return new UpdateAcessTokenRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashComparerStub: HashComparer,
    encrypterStub: Encrypter,
    updateAcessTokenRepositoryStub: UpdateAcessTokenRepository
}

const makeSut = (): SutTypes  => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const hashComparerStub = makeHashComparerStub()
    const encrypterStub = makeEncrypterStub()
    const updateAcessTokenRepositoryStub = makeUpdateAcessTokenRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAcessTokenRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        encrypterStub,
        updateAcessTokenRepositoryStub
    }
}

describe('DbAuthentication UseCase', () => {
   test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
   })

   test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
   })

   test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(null)
    const accesToken = await sut.auth(makeFakeAuthentication())
    expect(accesToken).toBeNull()
   })

   test('Should call hashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
   })

   test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
   })

   test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accesToken = await sut.auth(makeFakeAuthentication())
    expect(accesToken).toBeNull()
   })

   test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
   })

   test('Should throw if HashComparer throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
   })

   test('Should return a token on sucess', async () => {
    const { sut } = makeSut()
    const accesToken = await sut.auth(makeFakeAuthentication())
    expect(accesToken).toBe('fake_token')
   })

   test('Should call UpdateAcessTokenRepository with correct values', async () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAcessTokenRepositoryStub, 'updateAcessToken')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'fake_token')
   })

   test('Should throw if UpdateAcessTokenRepository throws', async () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAcessTokenRepositoryStub, 'updateAcessToken').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
   })
})