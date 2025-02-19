import { ConvertKeysToCamel, OmitBy, PartialBy } from "@app/shared/types";
import { AthleteCategory } from "../global/categories";

export const USER_ROLES_LIST = ['ADMIN', 'USER'] as const;
export const USER_SEX_LIST = ['M', 'F'] as const;
export const USER_STATUS_LIST = ['ACTIVE', 'INACTIVE', 'BLOCKED', 'BANNED'] as const;

export type UserRole = typeof USER_ROLES_LIST[number];
export type UserSex = typeof USER_SEX_LIST[number];
export type UserStatus = typeof USER_STATUS_LIST[number];

export interface IUserDbRow {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: UserStatus;
    role: UserRole;
    is_coach: boolean;
    verified: boolean;
    category: AthleteCategory;
    email: string;
    username: string;
    alias: string | null;
    name: string;
    last_name: string;
    sex: UserSex;
    birthdate: Date;
    tall: number;
    weight: number;
    cellphone: string;
    nationality: string;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zip_code: string | null;
    jwt_secret_key: string;
    password: string
}

export type UserRaw = ConvertKeysToCamel<IUserDbRow>;
export type UserCreatePayload = PartialBy< OmitBy<UserRaw, 'id' | 'createdAt' | 'updatedAt'>, "role" | "verified" | "isCoach" | "alias" | "address" | "city" | "state" | "country" | "zipCode" | "jwtSecretKey">;
export type UserUpdatePayload = OmitBy<Partial<UserRaw>, "id" | "createdAt">;