import { AddBankCardRepository } from "@/data/protocols/db/bank-card/add-bank-card-repository"
import { LoadBankCardByIdRepository } from "@/data/protocols/db/bank-card/load-bank-card-by-id-repository"
import { BankCardModel } from "@/domain/models/bank-card"
import { AddBankCardModel } from "@/domain/use-cases/bank-card/add-bank-card"
import mongoHelper from "@/infra/db/mongodb/mongo-helper"
import { ObjectId } from "mongodb"

export class MongoBankCardRepository implements AddBankCardRepository, LoadBankCardByIdRepository {
  async add(bankCardData: AddBankCardModel, bankAccountId: string): Promise<BankCardModel> {
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    const bankCardId = new ObjectId()
    bankAccountsCollection.updateOne({ _id: new ObjectId(bankAccountId) },
      { $push: { "cards": Object.assign({}, { _id: bankCardId }, bankCardData) } })

    const mongoBankAccount = await bankAccountsCollection.findOne(
      {
        _id: new ObjectId(bankAccountId),
        "cards": { "$elemMatch": { "_id": bankCardId } }
      })
    const mongoBankCard = mongoBankAccount!.cards[0]
    const bankCard = mongoHelper.map(mongoBankCard)
    return bankCard
  }
  async loadById(bankCardId: string, bankAccountId: string): Promise<BankCardModel | null> {
    const bankAccountsCollection = await mongoHelper.getCollection('bank-accounts')
    const mongoBankAccount = await bankAccountsCollection.findOne(
      {
        _id: new ObjectId(bankAccountId),
        "cards": { "$elemMatch": { "_id": new ObjectId(bankCardId) } }
      })
    const mongoBankCard = mongoBankAccount?.cards[0]
    if(!mongoBankCard) {
      return null
    }
    const bankCard = mongoHelper.map(mongoBankCard)
    return bankCard
  }
}