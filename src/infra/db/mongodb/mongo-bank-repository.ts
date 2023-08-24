import { LoadBankByIdRepository, LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import mongoHelper from "./mongo-helper"
import { ObjectId } from "mongodb"

export class MongoBankRepository implements LoadBanksRepository, LoadBankByIdRepository {
  async loadBanks(): Promise<BankModel[]> {
    const bankCollection = await mongoHelper.getCollection('banks')
    const mongoBanks: any = await bankCollection.find().toArray()
    const banks = mongoHelper.mapCollection(mongoBanks)
    return banks
  }

  async loadBankById(bankId: string): Promise<BankModel | null> {
    const bankCollection = await mongoHelper.getCollection('banks')
    const mongoBank = await bankCollection.findOne(new ObjectId(bankId))
    if (!mongoBank) { return null}
    const bank = mongoHelper.map(mongoBank)
    return bank
  }
}