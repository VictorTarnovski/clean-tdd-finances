interface Account {
    id: string
    username: string
    email: string
    password: string
    passwordConfirmation: string,
    bankAccounts: BankAccount[]
    createdAt: Date
}

interface BankAccount {
    id: string
    number: number
    balance: number
    currency: string
    cards: BankCard[]
    createdAt: Date
    updatedAt: Date
}

interface BankCard {
    id: string
    number: number
    flag: string
    expiresAt: Date
    createdAt: Date
}

interface Transaction {
    id: string
    description: string
    value: number
    bankAccountId: string,
    cardId: string | null,
    categoryId: string
    createdAt: Date
}

interface Category {
    name: string
    operation: '+'|'-',
    children: Category[]
}