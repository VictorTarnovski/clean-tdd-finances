import { Validation } from "@/presentation/protocols"
import { ValidationComposite, RequiredFieldValidation } from "@/validation/validators"
import { makeBankCardValidation } from "./add-bank-card-validation-factory"

jest.mock('../../../../../validation/validators/validation-composite')

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