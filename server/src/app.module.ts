import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisModule } from './redis/redis.module.js';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module.js';
import {JwtModule} from '@nestjs/jwt'
import { RedisService } from './redis/redis.service.js';
import { BullModule } from '@nestjs/bullmq'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    } ),
    
    JwtModule.register({
      global: true,
    } ),
    ThrottlerModule.forRoot( {
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    } ),
    
    PrismaModule,
    AuthModule,
    RedisModule,
    MailModule,
    BullModule.forRootAsync( {
      imports: [ RedisModule ],
      useFactory: ( redis: RedisService ) => ( {
        connection: redis.getClient()
      } )
    } ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
