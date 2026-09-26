
import { Injectable, Logger } from '@nestjs/common';

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js';


@Injectable()
export class PrismaService extends PrismaClient
{
    private readonly logger = new Logger( PrismaService.name );
    constructor ()
    {
        const adapter = new PrismaPg( {
            connectionString:process.env.DATABASE_URL
        })
        super({ adapter });
    }
}
