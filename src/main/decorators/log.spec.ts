import { LogControllerDecorator } from "./log"
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols"
import { ok, serverError } from "../../presentation/helpers/http-helper"
import { LogErrorRepository } from "../../data/protocols/log-error-repository"

describe('LogController Decorator',  () => {

    const makeLogErrorRespository = (): LogErrorRepository => {
        class LogErrorRepositoryStub implements LogErrorRepository {
            async log(stack: string): Promise<void> {
                return new Promise(resolve => resolve())
            }
        }
        return new LogErrorRepositoryStub()

    }

    const makeController = (): Controller => {
        class ControllerStub implements Controller {
            async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
                return ok('OK')
            }
        }
        return new ControllerStub()
    }

    interface SutTypes {
        sut: LogControllerDecorator,
        controllerStub: Controller,
        logErrorRepositoryStub: LogErrorRepository
    }

    const makeSut = (): SutTypes => {
        const controllerStub = makeController()
        const logErrorRepositoryStub = makeLogErrorRespository()
        const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
        return {
            sut,
            controllerStub,
            logErrorRepositoryStub
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

    test('Should call LogErrorRepository with correct error if controller returns a serverError',  async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        const error = serverError(fakeError)
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
        jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(error)
        const httpRequest = {
            body: {
                number: 1,
                currency: 'USD'
            }
        }
        await sut.handle(httpRequest)
        expect(logSpy).toBeCalledWith('any_stack')
    })

})