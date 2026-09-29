import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import type { AuthenticatedRequest } from '../auth/types/auth-request.types.js';
import type { BookingStatusDto } from './dto/booking-status.dto.js';
import { AuthGuard } from '../auth/authguard/auth.guard.js';
import { RoleGuard } from '../auth/role/role.guard.js';
import { Roles } from '../auth/role/role/role.decorator.js';
import { UserRole } from '../generated/prisma/browser.js';
import { Throttle } from '@nestjs/throttler';


@Controller( 'bookings' )
@UseGuards( AuthGuard )
export class BookingsController
{
  constructor ( private readonly bookingsService: BookingsService ) { }

  @Throttle( {
    default: {
      limit: 6, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.CREATED )
  @Post()
  async create ( @Body() createBookingDto: CreateBookingDto, @Req() req: AuthenticatedRequest )
  {
    return await this.bookingsService.create( createBookingDto, req.user.id );
  }

  @Throttle( {
    default: {
      limit: 10, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Get()
  async findAll ( @Req() req: AuthenticatedRequest )
  {
    return await this.bookingsService.findAll( req.user.id );
  }


  @Throttle( {
    default: {
      limit: 10, // limit each IP to 6 requests per `window`
      ttl: 60_000,
    },
  } )
  @HttpCode( HttpStatus.OK )
  @Patch( ':id' )
  @UseGuards( RoleGuard )
  @Roles( UserRole.ADMIN )
  async update ( @Param( 'id' ) id: string, @Body() data: BookingStatusDto )
  {
    return await this.bookingsService.setBookingStatus( data, id );
  }

}
