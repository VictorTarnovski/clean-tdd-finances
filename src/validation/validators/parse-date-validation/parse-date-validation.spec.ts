import { InvalidParamError } from "@/presentation/errors"
import { ParseDateValidation } from "./parse-date-validation"

const makeSut = (): ParseDateValidation => {
  return new ParseDateValidation('field')
}

describe('ParseDateValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ date: 'invalid_date' })
    expect(error).toEqual(new InvalidParamError('field'))
  })
})