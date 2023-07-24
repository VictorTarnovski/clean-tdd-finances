import { Decrypter } from "../../../data/protocols/criptography/decrypter"
import { Encrypter } from "../../../data/protocols/criptography/encrypter"
import jwt from "jsonwebtoken"

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) { }
  async encrypt(value: string): Promise<string> {
    const acessToken = jwt.sign({ id: value }, this.secret)
    return acessToken
  }
  async decrypt(token: string): Promise<string | null> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}