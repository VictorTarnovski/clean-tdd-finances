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
        const url = reference.concat('.json')
        const { body } = await this.httpService.post({url, requestBody: childData})
        return { id: body.name as unknown as string }
    }
}