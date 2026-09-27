import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { CarCategory, FuelType, Location, Transmission } from "../../generated/prisma/enums.js";

export class CreateCarDto
{
    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    @Length( 4, 4 )
    year: number;

    @IsNotEmpty()
    @IsEnum( CarCategory )
    category: CarCategory;


    @IsNotEmpty()
    @IsNumber()
    seating_capacity: number;

    @IsNotEmpty()
    @IsEnum( FuelType )
    fuelType: FuelType;

    @IsNotEmpty()
    @IsEnum( Transmission )
    transmission: Transmission;

    @IsNotEmpty()
    @IsDecimal()
    pricePerDay: number;

    @IsNotEmpty()
    @IsEnum( Location )
    location: Location;

    @IsNotEmpty()
    @IsString()
    description: string;
}
