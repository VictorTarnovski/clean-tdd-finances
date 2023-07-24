import jwt from "jsonwebtoken"
import { JwtAdapter } from "./jwt-adapter"

jest.mock('jsonwebtoken', () => ({
  async sign() {
    return 'any_token'
  },
  async verify() {
    return 'any_value'
  }
}))

interface SutTypes {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return { sut }
}

describe('Sign()', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should returns a token on sign success', async () => {
    const { sut } = makeSut()
    const acessToken = await sut.encrypt('any_id')
    expect(acessToken).toBe('any_token')
  })

  test('Should thorw if sign throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
  })
})

describe('Verify()', () => {
  test('Should call verify with correct values', async () => {
    const { sut } = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('any_token')
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  test('Should returns a value on verify success', async () => {
    const { sut } = makeSut()
    const value = await sut.decrypt('any_token')
    expect(value).toBe('any_value')
  })

  test('Should thorw if verify throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.decrypt('any_id')
    expect(promise).rejects.toThrow()
  })
})