import { IsDate, IsDecimal, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PaymentMethod, BookingStatus } from "../../generated/prisma/enums.js";

export class CreateBookingDto
{
    @IsNotEmpty()
    @IsString()
    carId: string;

    @IsNotEmpty()
    @IsDate()
    pickupDate: Date;

    @IsNotEmpty()
    @IsDate()
    returnDate: Date;

    @IsNotEmpty()
    @IsEnum( PaymentMethod )
    paymentBy: PaymentMethod;

    @IsNotEmpty()
    @IsDecimal()
    price: number;

    @IsNotEmpty()
    @IsEnum( BookingStatus )
    status: BookingStatus;
}
