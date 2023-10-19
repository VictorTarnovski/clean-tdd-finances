import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation } from "@/validation/validators"


export const makeLoadTransactionsByBankAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['bankAccountId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}