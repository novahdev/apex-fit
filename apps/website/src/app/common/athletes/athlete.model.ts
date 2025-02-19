import { ApiAthlete } from "@app/shared/api/athletes/api-athletes";

export class Athlete {
    public readonly status: string;
    public readonly isCoach: boolean;
    public readonly verified: boolean;
    public readonly category: string;
    public readonly username: string;
    public readonly alias: string;
    public readonly nationality: string;

    public readonly gym: { slug: string, name: string } | null;

    constructor(data: ApiAthlete){
        this.alias = data.alias; 
        this.category = data.category;
        this.isCoach = data.isCoach;
        this.status = data.status;
        this.username = data.username;
        this.verified = data.verified;
        this.nationality = data.nationality;
        this.gym = null;
    }
}