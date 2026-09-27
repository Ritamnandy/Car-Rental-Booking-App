import { IsDecimal, IsNotEmpty } from "class-validator";

export class PricePerDayDto
{
    @IsNotEmpty()
    @IsDecimal()
    pricePerDay: number;
}