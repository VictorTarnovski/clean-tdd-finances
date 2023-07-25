import { Validation } from "../../../../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "../../../../../validation/validators"


export const makeAddBankAccountValidation = (): ValidationComposite => {
    const validations: Validation[] = []
     for (const field of ['number', 'currency']) {
        validations.push(new RequiredFieldValidation(field))
     }
     const supportedCurrencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BRL']
     validations.push(new SupportedValuesValidation('currency', supportedCurrencies))
    return new ValidationComposite(validations)
}