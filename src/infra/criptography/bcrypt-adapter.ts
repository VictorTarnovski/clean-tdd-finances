import { HashComparer } from "../../data/protocols/criptography/hash-comparer"
import { Hasher } from "../../data/protocols/criptography/hasher"
import bcrypt from "bcrypt"

export class BcryptAdapter implements Hasher, HashComparer {
    private readonly salt
    constructor(salt: number) {
        this.salt = salt
    }
    async hash(value: string): Promise<string> {
        const hashed_value = await bcrypt.hash(value, this.salt)
        return hashed_value
    }
    async compare(value: string, hash: string): Promise<boolean> {
        const isEqual = await bcrypt.compare(value, hash)
        return isEqual
    }
}