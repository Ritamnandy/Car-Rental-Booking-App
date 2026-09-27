import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisModule } from './redis/redis.module.js';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module.js';
import { JwtModule } from '@nestjs/jwt'
import { RedisService } from './redis/redis.service.js';
import { BullModule } from '@nestjs/bullmq'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CarsModule } from './cars/cars.module.js';
import { ImagesModule } from './images/images.module.js';
import imagekitConfig from './config/imagekit.config.js';
@Module( {
  imports: [
    ConfigModule.forRoot( {
      isGlobal: true,
      load: [imagekitConfig]
    } ),

    JwtModule.register( {
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
      } ),
      inject: [ RedisService ],
    } ),
    CarsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
} )
export class AppModule { }
