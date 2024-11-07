import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthenticateDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    accessToken: string;
}