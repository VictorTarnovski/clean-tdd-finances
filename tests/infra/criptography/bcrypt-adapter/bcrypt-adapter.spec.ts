import bcrypt from "bcrypt"
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter"

jest.mock('bcrypt', () => ({
    async hash() {
        return 'hashed_value'
    },
    async compare() {
        return true
    }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('Hash', () => {
   test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
   })

   test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
   })

   test('Should thorw if hash throws', async () => {
    const sut = makeSut()
    const mockedError = new Error()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(mockedError)) })
    const promise = sut.hash('any_value')
    expect(promise).rejects.toThrow()
   })

   test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
   })

   test('Should return true on compare success', async () => {
    const sut = makeSut()
    const isEqual = await sut.compare('any_value', 'hashed_value')
    expect(isEqual).toBe(true)
   })

   test('Should return false if compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const isEqual = await sut.compare('any_value', 'hashed_value')
    expect(isEqual).toBe(false)
   })
})

describe('Compare', () => {
    test('Should call compare with correct values', async () => {
     const sut = makeSut()
     const compareSpy = jest.spyOn(bcrypt, 'compare')
     await sut.compare('any_value', 'any_hash')
     expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
 
    test('Should return true on compare success', async () => {
     const sut = makeSut()
     const isEqual = await sut.compare('any_value', 'hashed_value')
     expect(isEqual).toBe(true)
    })
 
    test('Should return false if compare fails', async () => {
     const sut = makeSut()
     jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
     const isEqual = await sut.compare('any_value', 'hashed_value')
     expect(isEqual).toBe(false)
    })

    test('Should thorw if compare throws', async () => {
        const sut = makeSut()
        const mockedError = new Error()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(mockedError)) })
        const promise = sut.hash('any_value')
        expect(promise).rejects.toThrow()
    })
 })