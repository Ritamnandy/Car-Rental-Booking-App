import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy
{
    private readonly logger = new Logger( RedisService.name )

    private readonly redis: Redis

    constructor ( private readonly configService: ConfigService )
    {
        this.redis = new Redis( {
            host: this.configService.getOrThrow( 'REDIS_HOST' ),
            port: Number( this.configService.getOrThrow( 'REDIS_PORT' ) ),
            maxRetriesPerRequest: null,

        } )
        this.redis.on( 'error', ( error ) =>
        {
            this.logger.error( 'Redis error:', error )
        } )
        this.redis.on( 'connect', () => this.logger.log( 'Redis connected' ) )
    }

    async set ( key: string, value: string, ttl: number )
    {
        return await this.redis.set( key, value, 'EX', ttl )
    }

    async get ( key: string )
    {
        return await this.redis.get( key )
    }


    async delete ( key: string )
    {
        await this.redis.del( key )
    }

    async getClient ()
    {
        return this.redis
    }


    async onModuleDestroy ()
    {
        await this.redis.quit()
        this.logger.warn( 'Redis disconnect' )
    }
}
