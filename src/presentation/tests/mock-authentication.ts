import { Authentication,  AuthenticationModel } from "@/domain/use-cases/authentication/authentication"

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
      async auth(authentication: AuthenticationModel): Promise<string | null> {
          return 'any_token'
      }
  }
  return new AuthenticationStub()
}