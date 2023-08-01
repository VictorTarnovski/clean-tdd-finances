import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols"
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
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        description,
        value,
        operation,
        bankAccountId,
        bankCardId
      } = httpRequest.body
      const bankAccount = await this.loadBankAccountById.load(bankAccountId)
      if (!bankAccount) {
        return notFound('bankAccount')
      }
      if(bankCardId) {
        const bankCard = await this.loadBankCardById.load(bankCardId, bankAccountId)
        if(!bankCard) {
          return notFound('bankCard')
        }
      }
      const transaction = await this.addTransaction.add({ description, value, operation, bankAccountId, bankCardId })
      const newBalance = operation === 'addition' ? bankAccount.balance + transaction.value : bankAccount.balance - transaction.value
      await this.saveBankAccountBalance.save(newBalance, bankAccountId)
      return ok(transaction)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
