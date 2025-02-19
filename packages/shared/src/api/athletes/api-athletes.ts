import { UserSex } from "@app/shared/schemas/users/users.interfaces";
import { ApiResponse } from "../global/api-response.interface";
import { AthleteCategory } from "@app/shared/schemas/global/categories";

export type ApiAthlete = {
    status: string;
    isCoach: boolean;
    verified: boolean;
    category: AthleteCategory;
    username: string;
    alias: string,
    sex: UserSex,
    tall: number,
    weight: null,
    age: number,
    nationality: string,
    city: string,
    state: string,
    country: string;
}

export interface ApiAthletesResponse extends ApiResponse {
    data: ApiAthlete[]
}