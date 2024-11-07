import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class validateStaffDto {
    @IsNotEmpty()
    @IsString() 
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    password: string;
}