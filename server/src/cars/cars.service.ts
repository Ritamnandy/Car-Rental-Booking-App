import { ConflictException, Injectable, Logger, UploadedFile } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto.js';
import  { CarRepository } from './repository/car.repository.js';
import  { RedisService } from '../redis/redis.service.js';
import  { ImageService } from '../images/images.service.js';
import { carKey, carKeyWithId, carKeyWithOwnerId } from './constants.js';
import  { CarStatusDto } from './dto/carstatus.dto.js';
import  { LocationDto } from './dto/location.dto.js';


@Injectable()
export class CarsService
{
  private readonly logger = new Logger( CarsService.name );

  constructor (
    private readonly carRepository: CarRepository,
    private readonly redisService: RedisService,
    private readonly imageService: ImageService,
  ) { }

  async create ( createCarDto: CreateCarDto, @UploadedFile() file: Express.Multer.File, ownerId: string )
  {

    const imageResult = await this.imageService.uploadImage( file, '/car-rental/cars' );
    console.log( imageResult );
    if ( !imageResult || !imageResult.url )
    {
      throw new ConflictException( 'Failed to upload image, please try again later' );
    }
    const imageUrl = imageResult.url;
    const result = await this.carRepository.createCar( createCarDto, ownerId, imageUrl );

    return {
      success: true,
      message: 'Car created successfully',
      data: result,
    };

  }

  async findAllCar ()
  {

    const cachedData = await this.redisService.get( carKey() );
    if ( cachedData )
    {
      return {
        success: true,
        message: 'Cars retrieved from cache',
        data: cachedData,
      };
    }
    const result = await this.carRepository.getAllCars();
    await this.redisService.set( carKey(), JSON.stringify( result ), 60 * 10 );
    return {
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    };
  }

  async findOne ( carId: string )
  {
    const cacheKey = carKeyWithId( carId );
    const cachedData = await this.redisService.get( cacheKey );
    if ( cachedData )
    {
      return {
        success: true,
        message: 'Car retrieved from cache',
        data: cachedData,
      };
    }
    const result = await this.carRepository.getCarById( carId );
    await this.redisService.set( cacheKey, JSON.stringify( result ), 60 * 10 );
    return {
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    };
  }

  async updateCarStatus ( carId: string, data: CarStatusDto )
  {
    const result = await this.carRepository.setCarStatus( data, carId );
    const cacheKey = carKeyWithId( carId );
    await this.redisService.delete( cacheKey );
    await this.redisService.delete( carKey() );
    return {
      success: true,
      message: 'Car status updated successfully',
      data: result,
    };
  }

  async deleteCar ( carId: string )
  {
    const result = await this.carRepository.deleteCar( carId );
    const cacheKey = carKeyWithId( carId );
    await this.redisService.delete( cacheKey );
    await this.redisService.delete( carKey() );
    return {
      success: true,
      message: 'Car deleted successfully',
      data: result,
    };
  }

  async getCarByOwnerId ( ownerId: string )
{
    const cacheCar = await this.redisService.get( carKeyWithOwnerId( ownerId ) )
    if ( cacheCar )
    {
      return {
        success: true,
        message: 'Car retrieved from cache',
        data: cacheCar,
      };
    }
    const result = await this.carRepository.getCarByOwnerId( ownerId );
    await this.redisService.set( carKeyWithOwnerId( ownerId ), JSON.stringify( result ), 60 * 10 );
    return {
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    };
  }

  async getCarBylocation ( data: LocationDto )
  {
    const cacheCar = await this.redisService.get( carKey() );
    if ( cacheCar )
    {
      return {
        success: true,
        message: 'Car retrieved from cache',
        data: cacheCar,
      };
    }
    const result = await this.carRepository.getCarByLocation( data );
    await this.redisService.set( carKey(), JSON.stringify( result ), 60 * 10 );
    return {
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    };
  }

}
