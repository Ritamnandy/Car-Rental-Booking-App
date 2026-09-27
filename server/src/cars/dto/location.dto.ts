import { IsEnum, IsNotEmpty } from "class-validator";
import { Location } from "../../generated/prisma/enums.js";

export class LocationDto
{
    @IsNotEmpty()
    @IsEnum( Location )
    location: Location;
}