import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class NewCreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    displayName: string;
}