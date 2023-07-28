import { Encrypter } from "@/data/protocols/criptography/encrypter"
import { Decrypter } from "@/data/protocols/criptography/decrypter"
import { Hasher } from "@/data/protocols/criptography/hasher"
import { HashComparer } from "@/data/protocols/criptography/hash-comparer"

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
          return 'any_token'
      }
  }
  return new EncrypterStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
      async hash(value: string): Promise<string> {
          return 'hashed_value'
      }
  }
  return new HasherStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
      async compare(value: string, hash: string): Promise<boolean> {
          return true
      }
  }
  return new HashComparerStub
}