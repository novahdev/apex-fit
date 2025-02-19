import { Controller, Get } from '@nestjs/common';
import { ApiAthletesResponse } from '@app/shared/api/athletes/api-athletes';
import { DbConnectionService } from '@app/api/common/db-connection';

@Controller('athletes')
export class AthletesController {

    constructor(private readonly _db: DbConnectionService){}

    @Get()
    public async getAthletes(): Promise<ApiAthletesResponse> {
        const query = `
        select
            status,
            is_coach as isCoach,
            verified,
            category,
            username,
            alias,
            sex,
            tall,
            weight,
            EXTRACT(YEAR FROM age(CURRENT_DATE, birthdate))::int as age,
            nationality,
            city,
            state,
            country,
            null as gym
        from users;
        `;
        
        const athletes = (await this._db.query(query)).rows;
        return {
            data: athletes
        }
    }
}
