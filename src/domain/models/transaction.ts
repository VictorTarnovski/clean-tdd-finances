export type TransactionModel = {
  description: string,
  value: number,
  operation: 'addition' | 'subtraction'
  bankAccountId: string,
  cardId?: string
}