import { InvalidParamError } from "../../../presentation/errors"
import { Validation } from "../../../presentation/protocols/validation"

export class SupportedValuesValidation implements Validation {
    constructor(private readonly fieldName: string, private readonly supportedValues: string[]) {}
    validate(input: any): Error | null {
        let matches: number = 0
        for(const value of this.supportedValues) {
            if(input[this.fieldName] === value) {
                matches = matches + 1
            }
        }
        if(matches === 0) {
            return new InvalidParamError(this.fieldName)
        }
        return null
    }
}