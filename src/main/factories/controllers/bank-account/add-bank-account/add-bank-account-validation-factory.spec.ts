import { Validation } from "../../../../../presentation/protocols"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "../../../../../validation/validators"
import { makeBankAccountValidation } from "./add-bank-account-validation-factory"

jest.mock('../../../../../validation/validators/validation-composite')

describe('BankAccountValidation Factory', () => {
   test('Should call ValidationComposite with all validations', () => {
      makeBankAccountValidation()
      const validations: Validation[] = []
      for (const field of ['number', 'currency']) {
         validations.push(new RequiredFieldValidation(field))
      }
      const supportedCurrencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BRL']
      validations.push(new SupportedValuesValidation('currency', supportedCurrencies))
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})