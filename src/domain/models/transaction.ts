export type TransactionModel = {
  id: string
  description: string
  value: number
  operation: 'addition' | 'subtraction',
  createdAt: Date,
  bankAccountId: string
  bankCardId?: string
}