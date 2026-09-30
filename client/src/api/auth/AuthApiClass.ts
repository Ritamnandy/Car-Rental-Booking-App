
import toast from "react-hot-toast";
import api from "../../config/api.config";
import type { forgotPasswordData, loginData, registerData, resendOtpData, resetPasswordData, verifyEmailData } from "../../types/api.types";
import axios from "axios";

export class AuthApiClass
{

    async registerUser ( userData: registerData )
    {
        try
        {
            const data = {
                name: userData.name,
                email: userData.email,
                password: userData.password
            };
            // const response = await api.get('/auth/test');
            const response = await api.post( '/auth/register', data );
            console.log( 'axiox response:- ', response );

            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );
                
            } else
            {
                toast.error( "Failed to register user, please try again later" );
                throw error;

            }

            
        }
    }

    async resendOtpCode ( userData: resendOtpData )
    {
        try
        {
            const data = {
                email: userData.email,
            };
            const response = await api.post( '/auth/resend-otp', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to resend OTP, please try again later" );
                throw error;

            }


        }
    }

    async verifyUser ( userData: verifyEmailData )
    {
        try
        {
            const data = {
                email: userData.email,
                otp:userData.otp
            };
            const response = await api.post( '/auth/verify', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to verify user, please try again later" );
                throw error;

            }


        }
    }

    async loginUser ( userData: loginData )
    {
        try
        {
            const data = {
                email: userData.email,
                password: userData.password
            };
            const response = await api.post( '/auth/login', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to login user, please try again later" );
                throw error;

            }


        }
    }

    async logoutUser ()
    {
        try
        {
            const response = await api.delete( '/auth/logout' );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to logout user, please try again later" );
                throw error;

            }


        }
    }

    async refreshAccessToken ()
    {
        try
        {
            const response = await api.patch( '/auth/refresh-access-token' );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to refresh access token, please try again later" );
                throw error;

            }


        }
    }

    async forgetPassword ( userData: forgotPasswordData )
    {
        try
        {
            const data = {
                email: userData.email
            };
            const response = await api.post( '/auth/forget-password', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to forget password, please try again later" );
                throw error;

            }


        }
    }

    async resetPassword ( userData: resetPasswordData )
    {
        try
        {
            const data = {
                token: userData.token,
                password: userData.password
            };
            const response = await api.patch( '/auth/reset-password', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to reset password, please try again later" );
                throw error;

            }


        }
    }


    async getUserProfile ()
    {
        try
        {
            const response = await api.get( '/auth/profile' );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to get user profile, please try again later" );
                throw error;

            }


        }
    }



}

export const authApiClass = new AuthApiClass();