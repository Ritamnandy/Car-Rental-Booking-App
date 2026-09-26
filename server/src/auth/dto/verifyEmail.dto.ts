import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ResendOtpDto } from './resend.dto.js';

export class VerifyEmailDto extends ResendOtpDto
{

    @IsNotEmpty()
    @IsString()
    @Length( 6, 6 )
    otp: string;
}
