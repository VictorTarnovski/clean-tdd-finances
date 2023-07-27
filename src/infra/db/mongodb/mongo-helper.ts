import { MongoClient, Collection } from 'mongodb'

class MongoHelper {
    client: MongoClient | null
    uri: string| null

    constructor() {
        this.uri = null
        this.client = null
    }

    async connect(uri: string): Promise<void> {
        if (this.client) {
            await this.disconnect()
        }
        this.uri = uri
        this.client = await MongoClient.connect(uri)
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close()
        }
        this.client = null
    }

    async getCollection(name: string): Promise<Collection> {
        return this.client!.db().collection(name)
    }

    map(data: any): any {
        const { _id, ...rest } = data
        return { id: _id.toHexString(), ...rest }
    }

    mapCollection(data: any[]): any {
        return data.map(item => this.map(item))
    }
}

export default new MongoHelper()