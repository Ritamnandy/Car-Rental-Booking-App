import { Injectable, Logger } from '@nestjs/common';



@Injectable()
export class AuthRepository
{
    private readonly logger = new Logger( AuthRepository.name );
    constructor ()
    {
        
    }
}
