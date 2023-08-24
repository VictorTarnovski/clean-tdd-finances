import { LoadBanksRepository } from "@/data/protocols/db"
import { BankModel } from "@/domain/models"
import mongoHelper from "./mongo-helper"

export class MongoBankRepository implements LoadBanksRepository {
  async loadBanks(): Promise<BankModel[]> {
    const bankCollection = await mongoHelper.getCollection('banks')
    const mongoBanks: any = await bankCollection.find().toArray()
    const banks = mongoHelper.mapCollection(mongoBanks)
    return banks
  }
}