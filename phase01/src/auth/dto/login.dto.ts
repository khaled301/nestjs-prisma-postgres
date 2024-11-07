import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    name: string;
}