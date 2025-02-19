import { ApiProfileRequestUpdate } from "@app/shared/api/profile";
import { OmitBy } from "@app/shared/types";
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from 'class-transformer';

export class ProfileUpdateDto implements OmitBy<ApiProfileRequestUpdate, "birthdate"> {

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    @IsOptional()
    alias?: string | null;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    lastName?: string;

    @IsEmail()
    @MaxLength(100)
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    @IsOptional()
    username?: string;
    
    @IsIn(["M", "F"])
    @IsOptional()
    sex?: "M" | "F";

    @IsNumber()
    @IsOptional()
    tall?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : undefined)
    birthdate?: Date;

    @IsPhoneNumber()
    @IsOptional()
    cellphone?: string;

    @IsString()
    @MaxLength(2)
    @MinLength(2)
    @IsOptional()
    nationality?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @IsNotEmpty()
    address?: string | null;

    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @IsOptional()
    city?: string | null;

    @IsString()
    @MaxLength(2)
    @MinLength(2)
    @IsOptional()
    state?: string | null;

    @IsString()
    @MaxLength(2)
    @MinLength(2)
    @IsOptional()
    country?: string | null;
}