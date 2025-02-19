import { DbConnectionService } from '@app/api/common/db-connection';
import { Injectable } from '@nestjs/common';
import { FIELDS_USERS } from './queries';
import { UserCreatePayload, UserRaw } from '@app/shared/schemas/users';
import { User } from './user.model';
import { isEmail, isUUID } from 'class-validator';

@Injectable()
export class UsersService {
    constructor(
        private readonly _db: DbConnectionService
    ){}

    public async getUser(value: string): Promise<User | undefined> {
        const user = (await this._db.query<UserRaw>(`SELECT ${FIELDS_USERS} FROM users WHERE ${isUUID(value) ? "id" : (isEmail(value) ? "email": "username")    } = $1`, [value])).rows[0] ?? undefined;
        return user ? new User(user) : undefined;
    }

    public async getAllUsers(){
        const users = (await this._db.query<UserRaw>(`SELECT ${FIELDS_USERS} FROM users`)).rows;
        return users;
    }

    public async createUser(data: UserCreatePayload): Promise<User>{
        const user = (await this._db.insert<UserRaw>("users", data, FIELDS_USERS)).rows[0];
        return new User(user);
    }

    public async updateUser(id: string, data: Partial<UserCreatePayload>): Promise<UserRaw>{
        const user = (await this._db.update<UserRaw>("users", ["id = $1", [id]], data, FIELDS_USERS)).rows[0];
        return user;
    }

    public async usernameAvailable(username: string, ignore?: string): Promise<boolean>{
        let query = `SELECT EXISTS(SELECT * FROM users WHERE username = $1)`;
        const params: string[] = [username];
        if (ignore){
            query = 'SELECT EXISTS(SELECT * FROM users WHERE username = $1 and id != $2)';
            params.push(ignore);
        }

        return (await this._db.query<{ exists: boolean }>(query, params)).rows[0].exists === false;
    }

    public async emailAvailable(email: string, ignore?: string): Promise<boolean>{
        let query = `SELECT EXISTS(SELECT * FROM users WHERE email = $1)`;
        const params: string[] = [email];
        if (ignore){
            query = `SELECT EXISTS(SELECT * FROM users WHERE email = $1 AND id != $2)`;
            params.push(ignore);
        }
        return (await this._db.query<{ exists: boolean }>(query, params)).rows[0].exists === false;
    }
}
