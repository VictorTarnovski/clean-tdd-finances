import { Controller, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/transaction/add-transaction"
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"
import { SaveBankAccountBalance } from "@/domain/use-cases/bank-account/save-bank-account-balance"

export class AddTransactionController {
  constructor(
    private readonly addTransaction: AddTransaction,
    private readonly validation: Validation,
    private readonly loadBankAccountById: LoadBankAccountById,
    private readonly loadBankCardById: LoadBankCardById,
    private readonly saveBankAccountBalance: SaveBankAccountBalance
  ) { }
  async handle(request: AddTransactionController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const {
        description,
        value,
        operation,
        bankAccountId,
        bankCardId
      } = request
      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) {
        return notFound('bankAccount')
      }
      if (bankCardId) {
        const bankCard = await this.loadBankCardById.load(bankCardId, bankAccountId)
        if (!bankCard) {
          return notFound('bankCard')
        }
      }
      const transaction = await this.addTransaction.add({ description, value, operation, createdAt: new Date(), bankAccountId, bankCardId })
      const newBalance = operation === 'addition' ? bankAccount.balance + transaction.value : bankAccount.balance - transaction.value
      const updatedBankAccount = await this.saveBankAccountBalance.save(newBalance, bankAccountId)
      return ok(updatedBankAccount)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddTransactionController {
  export type Request = {
    description: string
    value: number
    operation: 'addition' | 'subtraction'
    bankAccountId: string
    bankCardId?: string
  }
}