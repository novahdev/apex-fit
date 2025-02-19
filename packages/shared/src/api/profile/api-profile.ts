import { ApiResponse } from "../global/api-response.interface";

export interface ApiProfileResponse extends ApiResponse {
    data: {
        alias: string | null;
        name: string;
        lastName: string;
        email: string;
        username: string;
        isCoach: boolean;
        sex: "M" | "F";
        tall: number;
        weight: number;
        birthdate: string;
        cellphone: string;
        nationality: string;
        address: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
    }
}

export type ApiProfileRequestUpdate = {
    alias?: string | null;
    name?: string;
    lastName?: string;
    email?: string;
    username?: string;
    isCoach?: boolean;
    sex?: "M" | "F";
    tall?: number;
    weight?: number;
    birthdate?: string;
    cellphone?: string;
    nationality?: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
}