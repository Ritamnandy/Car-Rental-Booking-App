import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { CarCategory, FuelType, Location, Transmission } from "../../generated/prisma/enums.js";
import { Type } from 'class-transformer';
export class CreateCarDto
{
    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @Type( () => Number )
    @IsInt()
    @Min( 1900 )
    @Max( 2100 )
    year: number;

    @IsNotEmpty()
    @IsEnum( CarCategory )
    category: CarCategory;


    @Type( () => Number )
    @IsNumber()
    @Min( 2 )
    seating_capacity: number;

    @IsNotEmpty()
    @IsEnum( FuelType )
    fuelType: FuelType;

    @IsNotEmpty()
    @IsEnum( Transmission )
    transmission: Transmission;

    @Type( () => Number )
    @IsNumber()
    @Min( 50 )
    pricePerDay: number;

    @IsNotEmpty()
    @IsEnum( Location )
    location: Location;

    @IsNotEmpty()
    @IsString()
    @MinLength( 10 )
    @MaxLength( 500 )
    description: string;
}
