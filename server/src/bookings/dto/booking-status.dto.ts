import { IsEnum, IsNotEmpty } from "class-validator";
import { BookingStatus } from "../../generated/prisma/enums.js";

export class BookingStatusDto
{

    @IsNotEmpty()
    @IsEnum( BookingStatus )
    status: BookingStatus
}
