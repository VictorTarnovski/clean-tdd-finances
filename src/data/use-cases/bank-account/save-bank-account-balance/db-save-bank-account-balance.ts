import { SaveBalanceRepository } from '@/data/protocols/db/bank-account/save-balance-repository'
import { BankAccountModel } from '@/domain/models/bank-account'
import { SaveBankAccountBalance } from '@/domain/use-cases/bank-account/save-bank-account-balance'

export class DbSaveBankAccountBalance implements SaveBankAccountBalance {
  constructor(private readonly saveBalanceRepository: SaveBalanceRepository) { }
  async save(balance: number, bankAccountId: string): Promise<BankAccountModel> {
    const bankAccount = await this.saveBalanceRepository.save(balance, bankAccountId)
    return bankAccount
  }
}