import { ValidationComposite } from "./validation-composite"
import { InvalidParamError } from "../../errors"
import { Validation } from "./validation"

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

interface SutTypes {
    sut: ValidationComposite
    validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
    const validationStubs = [makeValidationStub(), makeValidationStub()]
    const sut = new ValidationComposite(validationStubs)
    return { sut, validationStubs }
}

describe('ValidationComposite', () => {
   test('Should return an Error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockImplementationOnce(() => {
        return new InvalidParamError('any_field')
    })
    const error = sut.validate({ any_field: 'any_value'})
    expect(error).toEqual(new InvalidParamError('any_field'))
   })

   test('Should return the first Error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockImplementationOnce(() => {
        return new Error()
    })
    jest.spyOn(validationStubs[1], 'validate').mockImplementationOnce(() => {
        return new InvalidParamError('any_field')
    })
    const error = sut.validate({ any_field: 'any_value'})
    expect(error).toEqual(new Error())
   })

   test('Should not return if every validation suceeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value'})
    expect(error).toBeFalsy()
   })
})