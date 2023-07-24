import { Encrypter } from "../../../data/protocols/criptography/encrypter"
import jwt, { Jwt } from "jsonwebtoken"
import { JwtAdapter } from "./jwt-adapter"

jest.mock('jsonwebtoken', () => ({
    async sign() {
        return 'any_token'
    }
}))

interface SutTypes {
    sut: JwtAdapter
}

const makeSut = (): SutTypes => {
    const sut =  new JwtAdapter('secret')
    return { sut }
}

describe('Sign()', () => {
   test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'}, 'secret')
   })

   test('Should returns a token on sign success', async () => {
    const { sut } = makeSut()
    const acessToken = await sut.encrypt('any_id')
    expect(acessToken).toBe('any_token')
   })

   test('Should thorw if jwt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
   })
})