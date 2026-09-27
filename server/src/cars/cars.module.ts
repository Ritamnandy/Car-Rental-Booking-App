import { Module } from '@nestjs/common';
import { CarsService } from './cars.service.js';
import { CarsController } from './cars.controller.js';
import { CarRepository } from './repository/car.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ImagesModule } from '../images/images.module.js';

@Module( {
  imports:[PrismaModule,ImagesModule],
  controllers: [CarsController],
  providers: [CarsService,CarRepository],
})
export class CarsModule {}
