import { MissingParamError } from "../../errors"
import { badRequest, serverError } from "../bank-account/bank-account-protocols"
import { SignUpController } from "./signup"
import { AccountModel } from "../../../domain/models/account"
import { AddAccountModel } from "../../../domain/use-cases/add-account"
import { AddAccount } from '../../../domain/use-cases/add-account'
import { HttpRequest } from "../../protocols/http"
import { Validation } from "../../helpers/validators/validation"

describe('SignUp Controller', () => {

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

    const makeValidationStub = (): Validation => {
        class ValidationStub implements Validation {
            validate(input: any): Error | null {
                return null
            }
        }
        return new ValidationStub()
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
        addAccountStub: AddAccount,
        validationStub: Validation
    }

    const makeSut = (): SutTypes => {
        const addAccountStub = makeAddAccountStub()
        const validationStub = makeValidationStub()
        const sut = new SignUpController(addAccountStub, validationStub)
        return { sut, addAccountStub, validationStub }
    }

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

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest: HttpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toBeCalledWith(httpRequest.body)
    })

    test('Should return 400 if validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        const mockedError = new MissingParamError('any_field')
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(mockedError)
        const httpRequest: HttpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(mockedError))
    })
})