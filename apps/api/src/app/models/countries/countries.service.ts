import { DbConnectionService } from '@app/api/common/db-connection';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
    constructor(private readonly _db: DbConnectionService){}

    public async getCountries(): Promise<{ code: string, name: string, phoneCode: string }[]>{
        return (await this._db.connection.query('SELECT code, name, phone_code as "phoneCode" FROM data_countries')).rows;
    }

    public async getStates(country: string): Promise<{ code: string, name: string }[]>{
        return (await this._db.connection.query('SELECT code, name FROM data_countries_states WHERE country = $1', [country])).rows;
    }

    public async getCities(state: string): Promise<{ code: string, name: string }[]>{
        return (await this._db.connection.query('SELECT code, name FROM data_countries_cities WHERE state_code = $1', [ state])).rows
    }
}
