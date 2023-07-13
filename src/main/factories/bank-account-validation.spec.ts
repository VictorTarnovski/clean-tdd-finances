import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation/required-field-validation"
import { Validation } from "../../presentation/protocols/validation"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { makeBankAccountValidation } from "./bank-account-validation"
import { SupportedValuesValidation } from "../../presentation/helpers/validators/supported-values-validation/supported-values-validation"

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('BankAccountValidation Factory', () => {
   test('Should call ValidationComposite with all validations', () => {
      makeBankAccountValidation()
      const validations: Validation[] = []
      for (const field of ['number', 'balance', 'currency']) {
         validations.push(new RequiredFieldValidation(field))
      }
      const supportedCurrencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BRL']
      validations.push(new SupportedValuesValidation('currency', supportedCurrencies))
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})