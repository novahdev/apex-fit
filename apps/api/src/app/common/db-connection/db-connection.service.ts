import { Injectable } from '@nestjs/common';
import { PostgreSQlConnection } from './postgres/postgres';

@Injectable()
export class DbConnectionService extends PostgreSQlConnection {
    public static instance: DbConnectionService;
    constructor(){
        super();
        DbConnectionService.instance = this;
    }
}