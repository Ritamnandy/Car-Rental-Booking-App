import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class SetPasswordDto
{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    token: string
}
