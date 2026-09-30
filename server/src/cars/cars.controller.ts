import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { CarsService } from './cars.service.js';
import { CreateCarDto } from './dto/create-car.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { AuthenticatedRequest } from '../auth/types/auth-request.types.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/authguard/auth.guard.js';
import { Throttle } from '@nestjs/throttler';
import { CarStatusDto } from './dto/carstatus.dto.js';

import { UserRole } from '../generated/prisma/browser.js';
import { RoleGuard } from '../auth/roleguard/role.guard.js';
import { Roles } from '../auth/role/role.decorator.js';


@Controller( 'cars' )
@UseGuards( AuthGuard,RoleGuard )
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
  @Roles( UserRole.ADMIN )
  @UseInterceptors(
    FileInterceptor( 'carImage' ),
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
  @Roles( UserRole.USER, UserRole.ADMIN )
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
  @Roles( UserRole.USER, UserRole.ADMIN )
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
  @Roles( UserRole.ADMIN )
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
  @Roles( UserRole.ADMIN )
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
  @Roles( UserRole.ADMIN )
  @Get( ':ownerId' )
  async findCarsByOwnerId ( @Param( 'ownerId' ) ownerId: string )
  {
    return await this.carsService.getCarByOwnerId( ownerId );
  }



}
