import { Validation } from "../../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation } from "../../../presentation/helpers/validators"
import { makeBankCardValidation } from "./bank-card-validation-factory"

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('BankCardValidation Factory', () => {
   test('Should call ValidationComposite with all validations', () => {
      makeBankCardValidation()
      const validations: Validation[] = []
      for (const field of ['number', 'flag', 'expiresAt']) {
         validations.push(new RequiredFieldValidation(field))
      }
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})