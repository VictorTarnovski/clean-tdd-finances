import { HttpService, httpMethods } from "../../../../http/protocols/http-service"
export class FirebaseHelper {
    constructor(private httpService: HttpService) {

    }
    baseUrl: string = process.env.FIREBASE_DB_URL || ''

    setUrl(url: string) {
        this.baseUrl = url
    }

    getReference(reference: string) {
        return this.baseUrl.concat('/', reference)
    }

    async addChild(reference: string, childData: any) {
        const { body } = await this.httpService.post({url: reference, method: httpMethods.POST, requestBody: childData})
        return { id: body as unknown as string }
    }
}