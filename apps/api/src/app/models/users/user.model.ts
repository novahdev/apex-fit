import { IAuthDataPayload } from "@app/api/auth";
import { JwtService } from "@app/api/common/jwt";
import { UserRaw, UserStatus } from "@app/shared/schemas/users";
import { verify } from 'argon2';


export class User implements UserRaw {
    private _jwtService = JwtService.instance;
    public readonly id: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly role: "USER" | "ADMIN";
    public readonly status: UserStatus;
    public readonly isCoach: boolean;
    public readonly verified: boolean;
    public readonly category: string;
    public readonly email: string;
    public readonly username: string;
    public readonly alias: string | null;
    public readonly name: string;
    public readonly lastName: string;
    public readonly sex: "M" | "F";
    public readonly birthdate: Date;
    public readonly tall: number;
    public readonly weight: number;
    public readonly cellphone: string;
    public readonly nationality: string;
    public readonly address: string | null;
    public readonly city: string | null;
    public readonly state: string | null;
    public readonly country: string | null;
    public readonly zipCode: string | null;
    public readonly jwtSecretKey: string;
    public readonly password: string;

    constructor(data: UserRaw){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.status = data.status;
        this.role = data.role;
        this.isCoach = data.isCoach;
        this.verified = data.verified;
        this.category = data.category;
        this.email = data.email;
        this.username = data.username;
        this.alias = data.alias;
        this.name = data.name;
        this.lastName = data.lastName
        this.alias = data.alias;
        this.sex = data.sex;
        this.birthdate = data.birthdate;
        this.tall = data.tall;
        this.weight = data.weight;
        this.cellphone = data.cellphone;
        this.nationality = data.nationality;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.country = data.country;
        this.zipCode = data.zipCode;
        this.jwtSecretKey = data.jwtSecretKey;
        this.password = data.password;
    }

    public async matchPassword(password: string): Promise<boolean>{
        return await verify(this.password, password);
    }

    public async generateTokens(){
        const data: IAuthDataPayload = {
            user: {
                id: this.id,
                alias: this.alias ?? `${this.name} ${this.lastName}`,
                role: this.role,
                isCoach: this.isCoach
            }
        }
        return {
            accessToken: this._jwtService.generateJwtToken(data, { expiresIn: '8h' }),
            refreshToken: this._jwtService.generateRefreshToken({ id: this.id }, this.jwtSecretKey)
        }
    }
}