import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, ParseDateValidation } from "@/validation/validators"


export const makeBankCardValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['number', 'flag', 'expiresAt']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ParseDateValidation('expiresAt'))
  return new ValidationComposite(validations)
}