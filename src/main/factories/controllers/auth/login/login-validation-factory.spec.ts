import { Validation } from "../../../../../presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from "../../../../../validation/validators"
import { EmailValidator } from "../../../../../validation/protocols/email-validator"
import { makeLoginValidation } from "./login-validation-factory"

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidatorStub = (): EmailValidator => {
   class EmailValidatorStub implements EmailValidator {
       isValid(email: string): boolean {
           return true
       }
   }
   return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
   test('Should call ValidationComposite with all validations', () => {
     makeLoginValidation()
     const validations: Validation[] = []
     for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field))
     }
     validations.push(new EmailValidation(makeEmailValidatorStub(), 'email'))
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})