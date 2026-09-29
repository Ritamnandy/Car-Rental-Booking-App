import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { BookingsController } from './bookings.controller.js';
import { RedisModule } from '../redis/redis.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { BookingRepository } from './repository/booking.repository.js';
import { AuthModule } from '../auth/auth.module.js';

@Module( {
  imports: [ RedisModule, PrismaModule,AuthModule ],
  controllers: [ BookingsController ],
  providers: [ BookingsService, BookingRepository ],
} )
export class BookingsModule { }
