import { HttpService, RequestModel, ResponseModel } from "../protocols/http-service"

import axios from 'axios'

export class AxiosAdapter implements HttpService {
    async post({ url, method, requestBody, requestParams, requestHeaders }: RequestModel): Promise<ResponseModel> {
        const { data, status, headers } = await axios.request({ url, data: requestBody, params: requestParams, headers: requestHeaders})
        return { statusCode: status, headers: headers, body: data }
    }
}