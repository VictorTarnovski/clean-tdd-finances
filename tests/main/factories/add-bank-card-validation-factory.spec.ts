import { Validation } from "@/presentation/protocols"
import { ValidationComposite, RequiredFieldValidation, ParseDateValidation } from "@/validation/validators"
import { makeBankCardValidation } from "@/main/factories/controllers/bank-card/add-bank-card/add-bank-card-validation-factory"

jest.mock('@/validation/validators/validation-composite')

describe('BankCardValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeBankCardValidation()
    const validations: Validation[] = []
    for (const field of ['number', 'flag', 'expiresAt']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ParseDateValidation('expiresAt'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})