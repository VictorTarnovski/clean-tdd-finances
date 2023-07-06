import { InvalidParamError, MissingParamError } from "../../errors"
import { EmailValidator } from "../../protocols/email-validator"
import { badRequest, serverError } from "../bank-account/bank-account-protocols"
import { SignUpController } from "./signup"
import { AccountModel } from "../../../domain/models/account"
import { AddAccountModel } from "../../../domain/use-cases/add-account"
import { AddAccount } from '../../../domain/use-cases/add-account'
import { HttpRequest } from "../../protocols/http"
describe('SignUp Controller', () => {
    
    const makeEmailValidatorStub = () => {
        class EmailValidatorStub implements EmailValidator {
            isValid(emaiL: string): boolean {
                return true
            }
        }
        return new EmailValidatorStub()
    }

    const makeAddAccountStub = () => {
        class AddAccountStub implements AddAccount {
            async add(account: AddAccountModel): Promise<AccountModel>  {
                const fakeAccount = {
                    id: 'valid_id',
                    name: 'any_name',
                    email: 'any_email',
                    password: 'any_password'
                }
                return fakeAccount
            }
        }
        return new AddAccountStub()
    }

    const makeFakeRequest = (): HttpRequest => (
        {
            body: {
                name: "any_name",
                email: 'any_mail@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
    )

    interface SutTypes {
        sut: SignUpController
        emailValidatorStub: EmailValidator
        addAccountStub: AddAccount
    }

    const makeSut = (): SutTypes => {
        const emailValidatorStub = makeEmailValidatorStub()
        const addAccountStub = makeAddAccountStub()
        const sut = new SignUpController(emailValidatorStub, addAccountStub)
        return { sut, emailValidatorStub, addAccountStub }
    }

    test('Should return 400 if no name is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = {
            body: {
                email: 'any_mail@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })

    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })
    
    test('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })

    test('Should return 400 if no passwordConfirmation is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
    })
    
    test('Should return 400 if password confirmation fails', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'invalid_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
    })

    test('Should call emailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(isValidSpy).toBeCalledWith('any_mail@mail.com')
    })

    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    test('Should return 500 if emailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const mockedError = new Error()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw mockedError })
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(mockedError))
    })

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            email: 'any_mail@mail.com',
            name: 'any_name',
            password: 'any_password'
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        const mockedError = new Error()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw mockedError })
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(mockedError))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
    })

})