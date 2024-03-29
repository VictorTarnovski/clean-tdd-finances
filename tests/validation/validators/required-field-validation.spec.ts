import { MissingParamError } from "@/presentation/errors"
import { RequiredFieldValidation } from "@/validation/validators"

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation('field')
}

describe('RequiredFieldValidation', () => {
   test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ other_field: 'other_field'})
    expect(error).toEqual(new MissingParamError('field'))
   })

   test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field'})
    expect(error).toBeFalsy()
   })
})