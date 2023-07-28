import { LogControllerDecorator } from "./log-controller.decorator"
import { Controller } from "@/presentation/protocols"
import { ok, serverError } from "@/presentation/helpers/http/http-helper"
import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository"
import { mockLogErrorRespository } from "@/data/tests"
import { mockController } from "@/presentation/tests"

describe('LogController Decorator', () => {

  type SutTypes = {
    sut: LogControllerDecorator,
    controllerStub: Controller,
    logErrorRepositoryStub: LogErrorRepository
  }

  const makeSut = (): SutTypes => {
    const controllerStub = mockController()
    const logErrorRepositoryStub = mockLogErrorRespository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
      sut,
      controllerStub,
      logErrorRepositoryStub
    }
  }

  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle({})
    expect(handleSpy).toBeCalledWith({})
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok('ok'))
  })

  test('Should call LogErrorRepository with correct error if controller returns a serverError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(error)
    await sut.handle({})
    expect(logSpy).toBeCalledWith('any_stack')
  })

})