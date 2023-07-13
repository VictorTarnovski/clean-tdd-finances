import { InvalidParamError } from "../../../errors"
import { Validation } from "../../../protocols/validation"

export class SupportedValuesValidation implements Validation {
    private readonly fieldName: string
    private readonly supportedValues: string[]
    constructor(fieldName: string, supportedValues: string[]) {
        this.fieldName = fieldName
        this.supportedValues = supportedValues
    }
    validate(input: any): Error | null {
        let matches: number = 0
        for(const value of this.supportedValues) {
            if(input[this.fieldName] === value) {
                matches = matches + 1
            }
        }
        if(matches !== this.supportedValues.length) {
            return new InvalidParamError(this.fieldName)
        }
        return null
    }
}