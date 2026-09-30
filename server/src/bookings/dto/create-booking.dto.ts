import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaymentMethod, BookingStatus } from "../../generated/prisma/enums.js";
import { Type } from "class-transformer";
export class CreateBookingDto
{
    @IsNotEmpty()
    @IsString()
    carId: string;

    @Type( () => Date )
    @IsNotEmpty()
    @IsDate()
    pickupDate: Date;

    @Type( () => Date )
    @IsNotEmpty()
    @IsDate()
    returnDate: Date;

    @IsNotEmpty()
    @IsEnum( PaymentMethod )
    paymentBy: PaymentMethod;

    @Type( () => Number )
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
