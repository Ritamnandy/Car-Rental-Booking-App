import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { CarsService } from './cars.service.js';
import { CreateCarDto } from './dto/create-car.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { AuthenticatedRequest } from '../auth/types/auth-request.types.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/authguard/auth.guard.js';
import { Throttle } from '@nestjs/throttler';
import { CarStatusDto } from './dto/carstatus.dto.js';


@Controller( 'cars' )
@UseGuards( AuthGuard )
export class CarsController
{
  constructor ( private readonly carsService: CarsService ) { }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post()
  @HttpCode( HttpStatus.CREATED )
  @UseInterceptors(
    FileInterceptor( 'image' ),
  )
  async create ( @Body() createCarDto: CreateCarDto, @Req() req: AuthenticatedRequest, @UploadedFile() file: Express.Multer.File, )
  {
    return await this.carsService.create( createCarDto, file, req.user.id );
  }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Get()
  async findAll ()
  {
    return await this.carsService.findAllCar();
  }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Get( ':id' )
  async findOne ( @Param( 'id' ) id: string )
  {
    return await this.carsService.findOne( id );
  }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Patch( ':id' )
  async update ( @Param( 'id' ) id: string, @Body() data: CarStatusDto )
  {
    return await this.carsService.updateCarStatus( id, data );
  }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Delete( ':id' )
  remove ( @Param( 'id' ) id: string )
  {
    return this.carsService.deleteCar( id );
  }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Get( ':ownerId' )
  async findCarsByOwnerId ( @Param( 'ownerId' ) ownerId: string )
  {
    return await this.carsService.getCarByOwnerId( ownerId );
  }



}
