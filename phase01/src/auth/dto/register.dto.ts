import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @IsString() 
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    password: string;
}