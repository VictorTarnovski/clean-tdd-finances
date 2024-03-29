import { Validation } from "@/presentation/protocols"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "@/validation/validators"
import { makeAddTransactionValidation } from "@/main/factories/controllers/transactions/add-transaction/add-transaction-validation-factory"

jest.mock('@/validation/validators/validation-composite')

describe('AddTransactionValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTransactionValidation()
    const validations: Validation[] = []
    for (const field of ['description', 'value', 'type', 'bankAccountId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new SupportedValuesValidation('type', ['income', 'expense']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})