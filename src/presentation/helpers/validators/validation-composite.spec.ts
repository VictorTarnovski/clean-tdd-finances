import { ValidationComposite } from "./validation-composite"
import { InvalidParamError } from "../../errors"
import { Validation } from "./validation"

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return new InvalidParamError('any_field')
        }
    }
    return new ValidationStub()
}

interface SutTypes {
    sut: ValidationComposite
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidationStub()
    const sut = new ValidationComposite([validationStub])
    return { sut, validationStub }
}

describe('ValidationComposite', () => {
   test('Should return an Error if any validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value'})
    expect(error).toEqual(new InvalidParamError('any_field'))
   })
})