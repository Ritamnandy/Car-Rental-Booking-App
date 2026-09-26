
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class LoginDto
{
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string
}