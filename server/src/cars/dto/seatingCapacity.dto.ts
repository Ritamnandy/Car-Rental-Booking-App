import { IsNotEmpty, IsNumber } from "class-validator";

export class SeatingCapacityDto
{
    @IsNotEmpty()
    @IsNumber()
    seating_capacity: number;
}