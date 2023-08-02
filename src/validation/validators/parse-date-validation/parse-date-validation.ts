import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols"

export class ParseDateValidation implements Validation {
  constructor(private readonly fieldName: string) { }
  validate(input: any): Error | null {
    const parsedDate = Date.parse(input[this.fieldName])
    if (isNaN(parsedDate)) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}