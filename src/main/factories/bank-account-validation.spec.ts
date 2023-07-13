import { Validation } from "../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "../../presentation/helpers/validators"
import { makeBankAccountValidation } from "./bank-account-validation"

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