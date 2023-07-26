import { InvalidParamError } from "@/presentation/errors"
import { SupportedValuesValidation } from "./supported-values-validation"

const makeSut = (): SupportedValuesValidation => {
    return new SupportedValuesValidation('field', ['any_supported_value', 'any_other_supported_value'])
}

describe('SupportedValuesValidation', () => {
   test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_unsupported_value'})
    expect(error).toEqual(new InvalidParamError('field'))
   })

   test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_supported_value' })
    expect(error).toBeFalsy()
   })
})