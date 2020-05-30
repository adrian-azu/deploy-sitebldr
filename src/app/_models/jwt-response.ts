export interface JwtResponse {
    jwt: string,
    //expires_in?: number,
    status?:number,
    message?:string,
    roles?:string
}
