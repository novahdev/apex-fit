import { UserRole } from "@app/shared/schemas/users/users.interfaces";
import { ApiResponse } from "../global/api-response.interface";

export interface ApiAuthResponse extends ApiResponse {
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            role: UserRole;
            alias: string | null;
            isCoach: boolean;
        }
        gym?: {
            id: string;
            name: string;
            slug: string;
        }
    }
}