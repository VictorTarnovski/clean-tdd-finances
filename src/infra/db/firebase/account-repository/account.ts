import { AddBankAccountRepository } from "../../../../data/protocols/add-bank-account-repository";
import { BankAccountModel } from "../../../../domain/models/bank-account";
import { AddBankAccountModel } from "../../../../domain/use-cases/add-bank-account";
import { HttpService } from "../../../http/protocols/http-service";
import { FirebaseHelper } from "../helpers/firebase-helper";

export class FirebaseAccountRepository implements AddBankAccountRepository {
    firebaseHelper: FirebaseHelper
    httpService: HttpService
    constructor(httpService: HttpService) {
        this.httpService = httpService
        this.firebaseHelper = new FirebaseHelper(this.httpService)
    }
    async add(bankAccountData: AddBankAccountModel): Promise<BankAccountModel> {
        const bankAccountReference = this.firebaseHelper.getReference('bank-accounts')
        const { id } = await this.firebaseHelper.addChild(bankAccountReference, bankAccountData)
        return Object.assign({}, {id: id}, bankAccountData)
    }
}