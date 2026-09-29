import { Injectable, ConflictException } from '@nestjs/common';
import  { CreateBookingDto } from './dto/create-booking.dto.js';
import  { BookingRepository } from './repository/booking.repository.js';
import  { RedisService } from '../redis/redis.service.js';
import  { BookingStatusDto } from './dto/booking-status.dto.js';


@Injectable()
export class BookingsService
{

  constructor (
    private readonly bookingRepository: BookingRepository,
    private readonly redisService: RedisService

  ) { }

  async create ( createBookingDto: CreateBookingDto, userId: string )
  {
    const booking = await this.bookingRepository.createBooking( createBookingDto, userId );
    if ( !booking )
    {
      throw new ConflictException( 'Failed to create booking, please try again later' );
    }
    await this.redisService.delete( `bookings:${ userId }` );
    return {
      success: true,
      message: 'Booking created successfully',
      data: booking
    };
  }

  async findAll ( userId: string )
  {
    const cachedBookings = await this.redisService.get( `bookings:${ userId }` );
    if ( cachedBookings )
    {
      return {
        success: true,
        message: 'Bookings retrieved successfully',
        data: JSON.parse( cachedBookings )
      };
    }
    const bookings = await this.bookingRepository.getBookingsByUserId( userId );
    if ( !bookings )
    {
      throw new ConflictException( 'Failed to retrieve bookings, please try again later' );
    }
    await this.redisService.set( `bookings:${ userId }`, JSON.stringify( bookings ), 60 * 10 );
    return {
      success: true,
      message: 'Bookings retrieved successfully',
      data: bookings
    };
  }

  async setBookingStatus ( data: BookingStatusDto, bookingId: string )
  {
    const booking = await this.bookingRepository.setBookingStatus( data, bookingId );
    if ( !booking )
    {
      throw new ConflictException( 'Failed to update booking status, please try again later' );
    }
    await this.redisService.delete( `bookings:${ booking.userId }` );
    return {
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    };
  }

}
