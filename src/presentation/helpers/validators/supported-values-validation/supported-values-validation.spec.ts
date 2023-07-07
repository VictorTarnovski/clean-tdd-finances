import { InvalidParamError } from "../../../errors"
import { SupportedValuesValidation } from "./supported-values-validation"

const makeSut = (): SupportedValuesValidation => {
    return new SupportedValuesValidation('field', ['any_value'])
}

describe('SupportedValuesValidation', () => {
   test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_other_value'})
    expect(error).toEqual(new InvalidParamError('field'))
   })

   test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
   })
})