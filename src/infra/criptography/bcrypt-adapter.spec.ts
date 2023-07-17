import bcrypt from "bcrypt"
import { BcryptAdapter } from "./bcrypt-adapter"

jest.mock('bcrypt', () => ({
    async hash() {
        return 'hashed_value'
    }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
   test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
   })

   test('Should return a hash on sucess', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
   })

   test('Should thorw if bcrypt throws', async () => {
    const sut = makeSut()
    const mockedError = new Error()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(mockedError)) })
    const promise = sut.hash('any_value')
    expect(promise).rejects.toThrow()
   })
})