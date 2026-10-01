import axios from "axios";
import toast from "react-hot-toast";
import api from "../../config/api.config";
import type { CarStatus } from "../../types/car.type";
export class CarApiClass
{



    async addCar ( data: FormData )
    {
        try
        {
            const response = await api.post( '/cars', data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                toast.error( error.response?.data.message );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to get user profile, please try again later" );
                throw error;

            }


        }
    }

    async getAllCars ()
    {
        try
        {
            const response = await api.get( '/cars' );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                toast.error( error.response?.data.message );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to get user profile, please try again later" );
                throw error;

            }


        }
    }

    async updateStatus ( data: CarStatus, carId: string )
    {
        try
        {
            const response = await api.patch( `/cars/${ carId }`, data );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                toast.error( error.response?.data.message );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to set car Available status, please try again later" );
                throw error;

            }


        }
    }

    async deleteCarData ( carId: string )
    {
        try
        {
            const response = await api.delete( `/cars/${ carId }` );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                toast.error( error.response?.data.message );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to delete car, please try again later" );
                throw error;

            }


        }
    }

    async getCarByOwnerId ( ownerId: string )
    {
        try
        {
            const response = await api.get( `/cars/${ ownerId }` );
            return response;
        } catch ( error )
        {
            if ( axios.isAxiosError( error ) )
            {
                console.log( "Status:", error.response?.status );
                toast.error( error.response?.data.message );
                console.log( "Backend error:", error.response?.data.message );

            } else
            {
                toast.error( "Failed to get car, please try again later" );
                throw error;

            }


        }
    }



}

export const carApiClass = new CarApiClass()