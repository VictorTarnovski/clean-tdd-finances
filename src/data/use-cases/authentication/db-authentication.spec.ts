import { AccountModel } from "../../../domain/models/account"
import { AuthenticationModel } from "../../../domain/use-cases/authentication"
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository"
import { DbAuthentication } from "./db-authentication"

const makeFakeAuthentication = (): AuthenticationModel => ({email: 'any_mail@mail.com', password: 'any_password'})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository { 
        async load(email:string): Promise<AccountModel | null> {
            const account: AccountModel = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email',
                password: 'any_password'
            }
            return account
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes  => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepositoryStub
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
    expect(accesToken).toBe(null)
   })
})