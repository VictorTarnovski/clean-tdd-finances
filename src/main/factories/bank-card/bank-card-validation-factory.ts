import { Validation } from "../../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "../../../presentation/helpers/validators"


export const makeBankCardValidation = (): ValidationComposite => {
    const validations: Validation[] = []
     for (const field of ['number', 'flag', 'expiresAt']) {
        validations.push(new RequiredFieldValidation(field))
     }
    return new ValidationComposite(validations)
}