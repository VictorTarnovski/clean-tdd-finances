export class BankAccountController {
    handle(httpRequest: any): any {
        if(!httpRequest.body.number) {
            return { 
                statusCode: 400, 
                body: new Error('Missing param: number') 
            }
        }
        if(!httpRequest.body.currency) {
            return { 
                statusCode: 400, 
                body: new Error('Missing param: currency') 
            }
        }
    }
}