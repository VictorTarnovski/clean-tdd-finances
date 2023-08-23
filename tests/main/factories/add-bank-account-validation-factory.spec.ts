import { Validation } from "@/presentation/protocols"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "@/validation/validators"
import { makeAddBankAccountValidation } from "@/main/factories/controllers/bank-account/add-bank-account-validation-factory"
import { InMemoryCurrencyRepository } from "@/infra/in-memory/currency/in-memory-currency-repository"

jest.mock('@/validation/validators/validation-composite')

describe('AddBankAccountValidation Factory', () => {
   test('Should call ValidationComposite with all validations', async () => {
      makeAddBankAccountValidation()
      const validations: Validation[] = []
      const supportedCurrencies: string[] = []
      for (const field of ['number', 'currency']) {
         validations.push(new RequiredFieldValidation(field))
      }
      const currencyRepository = new InMemoryCurrencyRepository()
      const currencies = await currencyRepository.loadCurrencies()
      for(const currency of currencies) {
         supportedCurrencies.push(currency.code)
      }
      validations.push(new SupportedValuesValidation('currency', supportedCurrencies))
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
   })
})