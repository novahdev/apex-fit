import { UserRole } from "@app/shared/schemas/users";


export interface IAuthData {
    accessToken: string;
    user: {
        id: string;
        alias: string;
        role: UserRole;
        isCoach: boolean;
    },
    gym?: {
        id: string;
        name: string;
        slug: string;
    }
}

export interface IAuthDataPayload {
    user: {
        id: string;
        alias: string;
        role: UserRole;
        isCoach: boolean;
    }
    gym?: {
        id: string;
        name: string;
        slug: string;
    }
}