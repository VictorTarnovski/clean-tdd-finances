import { InvalidParamError } from '../../../presentation/errors'
import { EmailValidator } from "../../../validation/protocols/email-validator"
import { EmailValidation } from "./email-validation"

describe('EmailValidation', () => {
    
    const makeEmailValidatorStub = () => {
        class EmailValidatorStub implements EmailValidator {
            isValid(emaiL: string): boolean {
                return true
            }
        }
        return new EmailValidatorStub()
    }

    interface SutTypes {
        sut: EmailValidation
        emailValidatorStub: EmailValidator
    }

    const makeSut = (): SutTypes => {
        const emailValidatorStub = makeEmailValidatorStub()
        const sut = new EmailValidation(emailValidatorStub, 'email')
        return { sut, emailValidatorStub }
    }

    test('Should return an error if EmailValidator returns false', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const error = sut.validate({ email: 'any_mail@mail.com'})
        expect(error).toEqual(new InvalidParamError('email'))
    })

    test('Should call EmailValidator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        sut.validate({ email: 'any_mail@mail.com'})
        expect(isValidSpy).toBeCalledWith('any_mail@mail.com')
    })

    test('Should thorw if emailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const mockedError = new Error()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw mockedError })
        expect(sut.validate).toThrow()
    })
})