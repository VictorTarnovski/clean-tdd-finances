import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware"
import { Middleware } from "@/presentation/protocols"
import { makeDbLoadAccountByToken } from "@/main/factories/use-cases/account/db-load-account-by-token-factory"

export const makeAuthMiddleware = (role?: string): Middleware => new AuthMiddleware(makeDbLoadAccountByToken(), role)