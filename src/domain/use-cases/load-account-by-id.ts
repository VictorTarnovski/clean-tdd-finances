import { AccountModel } from "@/domain/models/account"

export interface LoadAccountById {
    load(accountId: string): Promise<AccountModel | null>
}