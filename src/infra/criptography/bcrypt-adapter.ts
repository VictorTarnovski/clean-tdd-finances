import { Encrypter } from "../../data/protocols/criptography/encrypter"
import bcrypt from "bcrypt"

export class BcryptAdapter implements Encrypter {
    private readonly salt
    constructor(salt: number) {
        this.salt = 12
    }
    async encrypt(value: string): Promise<string> {
        const hashed_value = await bcrypt.hash(value, this.salt)
        return hashed_value
    }
}