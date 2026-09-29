import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import type { PrismaService } from "../../prisma/prisma.service.js";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/client";
import type { CreateBookingDto } from "../dto/create-booking.dto.js";
import type { BookingStatusDto } from "../dto/booking-status.dto.js";



@Injectable()
export class BookingRepository
{

    private readonly logger = new Logger( BookingRepository.name );

    constructor ( private readonly prismaService: PrismaService )
    {
        this.logger.log( 'BookingRepository initialized' );
    }

    private handleError ( error: unknown, context: string, notFoundMsg: string = "Resource not found" ): never
    {
        if ( error instanceof PrismaClientKnownRequestError )
        {
            switch ( error.code )
            {
                case 'p2002':
                    this.logger.warn( `[${ context }] Unique constraint violation: ${ JSON.stringify( error.meta?.target ) }`, )
                    throw new ConflictException(
                        'A record with these details already exists',
                    );
                case 'p2025':
                    this.logger.warn( `[${ context }] Record not found` );
                    throw new NotFoundException( notFoundMsg );

                default:
                    this.logger.error(
                        `[${ context }] Prisma error ${ error.code }: ${ error.message }`,
                    );
                    throw new InternalServerErrorException( 'Database operation failed' );
            }
        }
        if ( error instanceof PrismaClientValidationError )
        {
            this.logger.error(
                `[${ context }] Prisma validation error: ${ error.message }`,
            );
            throw new BadRequestException(
                'Invalid data provided to database operation',
            );
        }
        this.logger.error(
            `[${ context }] Unexpected error: ${ ( error as Error )?.message }`,
            ( error as Error )?.stack,
        );
        throw new InternalServerErrorException(
            'Something went wrong, please try again later',
        );
    }

    async createBooking ( data: CreateBookingDto, userId: string )
    {
        try
        {
            return await this.prismaService.booking.create( {
                data: {
                    userId: userId,
                    carId: data.carId,
                    pickupDate: data.pickupDate,
                    returnDate: data.returnDate,
                    price: data.price,
                    status: data.status,
                    paymentBy: data.paymentBy,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'createBooking' );
        }
    }

    async getBookingsByUserId ( userId: string )
    {
        try
        {
            return await this.prismaService.booking.findMany( {
                where: {
                    userId: userId,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getBookingsByUserId' );
        }
    }
    async setBookingStatus ( data: BookingStatusDto, bookingId: string )
    {
        try
        {
            return await this.prismaService.booking.update( {
                where: {
                    id: bookingId,
                },
                data: {
                    status: data.status,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'setBookingStatus' );
        }
    }

    



}