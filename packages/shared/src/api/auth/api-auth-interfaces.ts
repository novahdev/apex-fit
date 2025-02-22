import { UserRole } from "@app/shared/schemas/users/users.interfaces";
import { ApiResponse } from "../global/api-response.interface";

export interface ApiAuthData {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        role: UserRole;
        name: string;
        isCoach: boolean;
    }
    gym?: {
        id: string;
        name: string;
        slug: string;
    }
}

export interface ApiAuthResponse extends ApiResponse {
    data: ApiAuthData;
}