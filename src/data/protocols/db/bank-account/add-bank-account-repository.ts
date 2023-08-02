import { BankAccountModel } from "@/domain/models/bank-account"
import { AddBankAccountModel } from "@/domain/use-cases/bank-account/add-bank-account"

export interface AddBankAccountRepository {
    add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel>
}