import { Validation } from "../../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from "../../../presentation/helpers/validators"
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator-adapter"


export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = []
     for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field))
     }
     validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    return new ValidationComposite(validations)
}