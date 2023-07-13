export interface authenticationModel {
    email: string
    password: string
}
export interface Authentication {
    auth(Authentication: authenticationModel): Promise<string | null>
}