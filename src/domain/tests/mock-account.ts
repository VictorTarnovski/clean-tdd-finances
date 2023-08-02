import { AccountModel } from "@/domain/models/account"
import { AddAccountModel } from "@/domain/use-cases/account/add-account"

export const mockAccountModel = (): AccountModel => ({
  id: 'any_account_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  role: 'any_role'
})

export const mockAddAccountModel = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})