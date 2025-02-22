export interface IProfile {
    alias: string | null;
    name: string;
    lastName: string;
    email: string;
    username: string;
    isCoach: boolean;
    sex: "M" | "F";
    tall: number;
    weight: number;
    birthdate: Date;
    cellphone: string;
    nationality: string;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
}