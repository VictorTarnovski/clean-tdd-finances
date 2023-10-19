import { Controller, HttpResponse, Validation } from "@/presentation/protocols"
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers/http/http-helper"
import { AddTransaction } from "@/domain/use-cases/transaction/add-transaction"
import { LoadBankAccountById } from "@/domain/use-cases/bank-account/load-bank-account-by-id"
import { LoadBankCardById } from "@/domain/use-cases/bank-card/load-bank-card-by-id"
import { SaveBankAccountBalance } from "@/domain/use-cases/bank-account/save-bank-account-balance"

export class AddTransactionController implements Controller {
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
      if (error) { return badRequest(error) }

      const { description, value, type, bankAccountId, bankCardId } = request

      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) { return notFound('bankAccount') }

      if (bankCardId) {

        const bankCard = await this.loadBankCardById.load(bankCardId, bankAccountId)
        if (!bankCard) {
          return notFound('bankCard')
        }

      }

      const newBalance = type === 'income' ? bankAccount.balance + value : bankAccount.balance - value
      this.saveBankAccountBalance.save(newBalance, bankAccountId)

      const transaction = await this.addTransaction.add({ description, value, type, createdAt: new Date(), bankAccountId, bankCardId })
      return ok(transaction)

    } catch (error: any) {

      return serverError(error)

    }
  }
}

export namespace AddTransactionController {
  export type Request = {
    description: string
    value: number
    type: 'income' | 'expense'
    bankAccountId: string
    bankCardId?: string
  }
}