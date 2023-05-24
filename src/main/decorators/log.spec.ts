import { LogControllerDecorator } from "./log"
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols"
import { ok } from "../../presentation/helpers/http-helper"

describe('LogController Decorator',  () => {

    interface SutTypes {
        sut: LogControllerDecorator,
        controllerStub: Controller
    }

    const makeController = (): Controller => {
        class ControllerStub implements Controller {
            async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
                return ok('OK')
            }
        }
        return new ControllerStub()
    }

    const makeSut = (): SutTypes => {
        const controllerStub = makeController()
        const sut = new LogControllerDecorator(controllerStub)
        return {
            sut,
            controllerStub
        }
    }

    test('Should call controller handle',  async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                number: 1,
                currency: 'USD'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toBeCalledWith(httpRequest)
    })

    test('Should return the same result of the controller',  async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                number: 1,
                currency: 'USD'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(ok('OK'))
    })

})