import { ValidationComposite } from "./validation-composite"
import { InvalidParamError } from "../../errors"
import { Validation } from "./validation"

class ValidationStub implements Validation {
    validate(input: any): Error | null {
        return new InvalidParamError('any_field')
    }
}

describe('ValidationComposite', () => {
   test('Should return an Error if any validation fails', () => {
    const sut = new ValidationComposite([new ValidationStub()])
    const error = sut.validate({ any_field: 'any_value'})
    expect(error).toEqual(new InvalidParamError('any_field'))
   })
})