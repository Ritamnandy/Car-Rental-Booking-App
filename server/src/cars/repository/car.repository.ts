
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/client";
import { CreateCarDto } from "../dto/create-car.dto.js";
import { LocationDto } from "../dto/location.dto.js";
import { CarStatusDto } from "../dto/carstatus.dto.js";
import { SeatingCapacityDto } from "../dto/seatingCapacity.dto.js";
import { PricePerDayDto } from "../dto/pricePerDay.dto.js";

@Injectable()
export class CarRepository
{
    private readonly logger = new Logger( CarRepository.name )

    constructor ( private readonly prismaService: PrismaService ) { }

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

    async createCar ( data: CreateCarDto, ownerId: string, imageUrl: string )
    {
        try
        {
            return await this.prismaService.car.create( {
                data: {
                    ...data,
                    ownerId,
                    image: imageUrl,
                },
            } );

        } catch ( error )
        {
            this.handleError( error, 'createCar' );
        }
    }

    async getCarById ( carId: string )
    {
        try
        {
            return await this.prismaService.car.findUnique( {
                where: {
                    id: carId,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getCarById' );
        }
    }

    async getCarByLocation ( data: LocationDto )
    {
        try
        {
            return await this.prismaService.car.findMany( {
                where: {
                    location: data.location,
                    isAvailable: true,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getCarByLocation' );
        }
    }

    async getAvailableCars ( data: LocationDto )
    {
        try
        {
            return await this.prismaService.car.findMany( {
                where: {
                    location: data.location,
                    bookings: {
                        none: {
                            status: {
                                in: [ 'PENDING', 'CONFIRMED' ],
                            },
                        },
                    },
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getAvailableCars' );
        }
    }

    async setCarStatus ( data: CarStatusDto, carId: string )
    {
        try
        {
            return await this.prismaService.car.update( {
                where: {
                    id: carId,
                },
                data: {
                    isAvailable: data.isAvailable,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'setCarStatus' );
        }
    }

    async getAllCars ()
    {
        try
        {
            return await this.prismaService.car.findMany();
        } catch ( error )
        {
            this.handleError( error, 'getAllCars' );
        }
    }

    async getCarByOwnerId ( ownerId: string )
    {
        try
        {
            return await this.prismaService.car.findMany( {
                where: {
                    ownerId,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getCarByOwnerId' );
        }
    }

    async deleteCar ( carId: string )
    {
        try
        {
            return await this.prismaService.car.delete( {
                where: {
                    id: carId,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'deleteCar' );
        }
    }

    async getCarBySeatingCapacity ( data: SeatingCapacityDto )
    {
        try
        {
            return await this.prismaService.car.findMany( {
                where: {
                    seating_capacity: data.seating_capacity,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getCarBySeatingCapacity' );
        }
    }

    async getCarByPricePerDay ( data: PricePerDayDto )
    {
        try
        {
            return await this.prismaService.car.findMany( {
                where: {
                    pricePerDay: data.pricePerDay,
                },
            } );
        } catch ( error )
        {
            this.handleError( error, 'getCarByPricePerDay' );
        }
    }


}