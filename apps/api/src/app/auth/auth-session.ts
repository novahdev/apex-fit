import { IAuthData } from "./auth-data";

export class AuthSession {
    public readonly accessToken: IAuthData["accessToken"];
    public readonly user: IAuthData["user"];
    constructor(data: IAuthData){
        this.user = Object.freeze(data.user);
        this.accessToken = data.accessToken;
    }
}