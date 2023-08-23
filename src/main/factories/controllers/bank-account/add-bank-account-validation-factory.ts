import { Validation } from "@/presentation/protocols/validation"
import { ValidationComposite, RequiredFieldValidation, SupportedValuesValidation } from "@/validation/validators"
import { InMemoryCurrencyRepository } from "@/infra/in-memory/currency/in-memory-currency-repository"

export const makeAddBankAccountValidation = async (): Promise<ValidationComposite> => {
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
    return new ValidationComposite(validations)
}