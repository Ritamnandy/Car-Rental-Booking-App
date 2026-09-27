import { Module } from '@nestjs/common';
import { CarsService } from './cars.service.js';
import { CarsController } from './cars.controller.js';
import { CarRepository } from './repository/car.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ImagesModule } from '../images/images.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { RedisModule } from '../redis/redis.module.js';

@Module( {
  imports:[PrismaModule,ImagesModule,AuthModule,RedisModule],
  controllers: [CarsController],
  providers: [CarsService,CarRepository],
})
export class CarsModule {}
