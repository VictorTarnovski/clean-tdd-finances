import { LogErrorRepository } from "../protocols/db/log/log-error-repository"

export const mockLogErrorRespository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
      async logError(stack: string): Promise<void> {
          return new Promise(resolve => resolve())
      }
  }
  return new LogErrorRepositoryStub()
}