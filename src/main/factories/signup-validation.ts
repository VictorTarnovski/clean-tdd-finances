import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation/required-field-validation"
import { Validation } from "../../presentation/protocols/validation"
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation/compare-fields-validation"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"
import { EmailValidation } from "../../presentation/helpers/validators/email-validation/email-validation"


export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
     for (const field of ['name', 'email', 'password' ,'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
     }
     validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
     validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    return new ValidationComposite(validations)
}