import { MissingParamError } from "../../errors"
import { Controller } from "../../protocols"
import { badRequest } from "../bank-account/bank-account-protocols"
import { SignUpController } from "./signup"

describe('SignUp Controller', () => {
    
    interface SutTypes {
        sut: Controller
    }

    const makeSut = () => {
        const sut = new SignUpController()
        return { sut }
    }

    test('Should return 400 if no name is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_mail',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })
                  
})