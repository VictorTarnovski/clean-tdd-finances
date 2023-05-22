export enum httpMethods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}
export interface RequestModel {
    url: string,
    method: httpMethods,
    requestHeaders?: any
    requestBody?: any
    requestParams?: any,
}

export interface ResponseModel {
    statusCode: number,
    body?: any
    headers?: any
}

export interface HttpService {
    post({url, requestBody, requestParams, requestHeaders}: RequestModel): Promise<ResponseModel>
}