import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "@/validation/validators"


export const makeAddTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = [] 
  for (const field of ['description', 'value', 'operation', 'bankAccountId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new SupportedValuesValidation('operation', ['addition', 'subtraction']))
  return new ValidationComposite(validations)
}