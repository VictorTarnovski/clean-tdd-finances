export type TransactionModel = {
  id: string
  description: string
  value: number
  operation: 'addition' | 'subtraction'
  bankAccountId: string
  cardId?: string
}