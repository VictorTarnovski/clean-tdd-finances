import { HttpService, RequestModel, ResponseModel, httpMethods } from "../protocols/http-service"
import axios from 'axios'
export class AxiosAdapter implements HttpService {
    async post({ url, requestBody, requestParams, requestHeaders }: RequestModel): Promise<ResponseModel> {
        const { data, status, headers } = await axios.request({ url, method: httpMethods.POST, data: requestBody, params: requestParams, headers: requestHeaders})
        return { statusCode: status, headers: headers, body: data }
    }
}