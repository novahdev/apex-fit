import { ApiAuthData } from '@app/shared/api/auth';
import { UserRole } from '@app/shared/schemas/users/users.interfaces';
export class Session {
    public readonly token: string;
    public readonly refreshToken: string;
    public readonly user: {
        id: string;
        role: UserRole;
        name: string;
        isCoach: boolean;
    }

    constructor(private _data: ApiAuthData){
        this.token = _data.accessToken;
        this.refreshToken = _data.refreshToken;
        this.user = Object.freeze({
            id: _data.user.id,
            role: _data.user.role,
            name: _data.user.name,
            isCoach: _data.user.isCoach
        });
    }

    public toJsonString(): string {
        return JSON.stringify(this._data);
    }

    onUpdate(data: Partial<ApiAuthData>){
        if (data.user){
            Object.assign(this, { user: 
                Object.freeze({
                    id: data.user.id,
                    role: data.user.role,
                    name: data.user.name,
                    isCoach: data.user.isCoach
                })
            })
        }
    }
}