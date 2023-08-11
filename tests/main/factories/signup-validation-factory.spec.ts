import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from "@/validation/validators"
import { EmailValidator } from "@/validation/protocols/email-validator"
import { makeSignUpValidation } from "@/main/factories/controllers/auth/signup/signup-validation-factory"

jest.mock('@/validation/validators/validation-composite')



const makeEmailValidatorStub = (): EmailValidator => {
   class EmailValidatorStub implements EmailValidator {
       isValid(email: string): boolean {
           return true
       }
   }
   return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
   test('Should call ValidationComposite with all validations', () => {
     makeSignUpValidation()
     const validations: Validation[] = []
     for (const field of ['name', 'email', 'password' ,'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
     }
     validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
     validations.push(new EmailValidation(makeEmailValidatorStub(), 'email'))
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})