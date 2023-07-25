export class NotFoundError extends Error {
    constructor(resource: string) {
        super(`Not found the specified ${resource}`)
        this.name = 'NotFoundError'
    }
}