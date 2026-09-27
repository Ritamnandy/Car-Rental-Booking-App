import { IsBoolean, IsNotEmpty } from "class-validator";

export class CarStatusDto
{
    @IsNotEmpty()
    @IsBoolean()
    isAvailable: boolean;
}