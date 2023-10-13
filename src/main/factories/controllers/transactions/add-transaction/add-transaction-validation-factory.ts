import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "@/validation/validators"
import { AddTransactionModel } from "@/domain/use-cases/transaction/add-transaction"


export const makeAddTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['description', 'value', 'type', 'bankAccountId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new SupportedValuesValidation('type', ['income', 'expense']))
  return new ValidationComposite(validations)
}