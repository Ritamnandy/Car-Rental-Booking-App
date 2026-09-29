import crypto from "node:crypto"
import bcrypt from "bcrypt"

const genarateOtp = (): string =>
{
    return crypto.randomInt( 100000, 999999 ).toString()
}

const OTP_EXPIRY = 10 * 60; // 10 minutes

const REGISTER_DATA_EXPIRY = 20 * 60 // 20 minutes

const signUpKey = ( email: string ) =>
{
    return `signup:${ email }`
}

const otpKey = ( email: string ) =>
{
    return `Otp-key:${ email }`
}
const resetTokenKey = ( email: string ) =>
{
    return `reset-token:${ email }`
}

const ResetPasswordLink = ( token: string, email: string ) =>
{
    return `${ process.env.FORGET_PASSWORD_URL as string }?token=${ token }&email=${ encodeURIComponent( email ) }`;
}

const rowCryptoToken = () => crypto.randomBytes( 32 ).toString( "hex" )

const hashedCryptoToken = ( token: string ) => crypto.createHash( "sha256" ).update( token ).digest( "hex" )

const apiUserMessage = ( success: boolean, message: string, user?: object, accessToken?: string, refreshToken?: string ) =>
{
    if ( user && accessToken && refreshToken )
    {
        return {
            success,
            message,
            user,
            accessToken,
            refreshToken,
        }

    }
    if ( accessToken && refreshToken )
    {
        return {
            success,
            message,
            accessToken,
            refreshToken,
        }
    }

    return {
        success,
        message,
    }
}


const hashPasword = async ( password: string ) =>
{
    return await bcrypt.hash( password, 13 )
}

const comparePassword = async ( password: string, hashedPassword: string ) =>
{
    return await bcrypt.compare( password, hashedPassword )
}





export { genarateOtp, OTP_EXPIRY, REGISTER_DATA_EXPIRY, signUpKey, otpKey, rowCryptoToken, hashedCryptoToken, apiUserMessage, hashPasword, comparePassword, resetTokenKey, ResetPasswordLink }
