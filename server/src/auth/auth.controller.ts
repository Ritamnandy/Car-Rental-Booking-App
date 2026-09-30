import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Response } from 'express'
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { ResendOtpDto } from './dto/resend.dto.js';
import { VerifyEmailDto } from './dto/verifyEmail.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refreshToken.dto.js';
import type { AuthenticatedRequest } from './types/auth-request.types.js';
import { SetPasswordDto } from './dto/setPassword.dto.js';
import { AuthGuard } from './authguard/auth.guard.js';
import { Throttle } from '@nestjs/throttler';
import { Roles } from './role/role.decorator.js';
import { UserRole } from '../generated/prisma/browser.js';
import { RoleGuard } from './roleguard/role.guard.js';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller( 'auth' )
export class AuthController
{
  private setAuthCookies (
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void
  {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie( 'accessToken', accessToken, {
      httpOnly: true,
      secure: isProd, // must be true in prod (HTTPS); false locally over http
      sameSite: 'strict',
      maxAge: 5 * 60 * 60 * 1000, // 1 hour — match access token expiry
      path: '/',
    } );

    res.cookie( 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days — match refresh token expiry
      path: '/auth/refresh-access-token', // scope it — only sent on the refresh endpoint, reduces exposure
    } );
  }

  constructor ( private readonly authService: AuthService )
  {

  }
  @Throttle( {
    default: {
      limit: 10, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Get('test')
  @HttpCode( HttpStatus.OK )
  async test () {
    return await this.authService.test();
  }


  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'register' )
  @HttpCode( HttpStatus.ACCEPTED )
  async registerUser ( @Body() data: CreateAuthDto )
  {
    const result = await this.authService.registerUser( data );
    return result;
  }

  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'resend-otp' )
  @HttpCode( HttpStatus.OK )
  async resendOtp ( @Body() data: ResendOtpDto )
  {
    return await this.authService.resendOtp( data );

  }


  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'verify' )
  @HttpCode( HttpStatus.CREATED )
  async verifyUser ( @Body() data: VerifyEmailDto, @Res( { passthrough: true } ) res: Response )
  {
    const result = await this.authService.verifyEmail( data );
    console.log(result);
    
    this.setAuthCookies( res, result.accessToken ?? '', result.refreshToken ?? '' );
    return result;
  }

  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'login' )
  @HttpCode( HttpStatus.OK )
  async login ( @Body() data: LoginDto, @Res( { passthrough: true } ) res: Response )
  {
    const result = await this.authService.loginUser( data );
    this.setAuthCookies( res, result.accessToken ?? '', result.refreshToken ?? '' );
    return result;
  }

  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Patch( 'refresh-access-token' )
  @HttpCode( HttpStatus.OK )
  async refreshAccessToken ( @Body() data: RefreshTokenDto, @Res( { passthrough: true } ) res: Response )
  {
    const result = await this.authService.refreshAccessToken( data.refreshToken );
    this.setAuthCookies( res, result.accessToken ?? '', result.refreshToken ?? '' );
    return result;
  }


  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Delete( 'logout' )
  @HttpCode( HttpStatus.OK )
  @UseGuards( AuthGuard )
  async logout ( @Res( { passthrough: true } ) res: Response, @Req() req: AuthenticatedRequest )
  {
    const response = await this.authService.logOutUser( req.user.id );
    res.clearCookie( 'accessToken' );
    res.clearCookie( 'refreshToken' );

    return response;
  }

  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'forget-password' )
  @HttpCode( HttpStatus.OK )
  async forgotPassword ( @Body() data: ResendOtpDto )
  {
    const result = await this.authService.forgotPassword( data );
    return result;
  }


  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Patch( 'reset-password' )
  @HttpCode( HttpStatus.OK )
  async resetPassword ( @Body() data: SetPasswordDto )
  {
    const result = await this.authService.resetPassword( data );
    return result;
  }

  @Throttle( {
    default: {
      limit: 5, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Get( 'profile' )
  @HttpCode( HttpStatus.OK )
  @UseGuards(AuthGuard, RoleGuard )
  @Roles( UserRole.ADMIN )
  async getProfile ( @Req() req: AuthenticatedRequest )
  {
    return await this.authService.getCurrentUser( req.user.id );
  }


  @Throttle( {
    default: {
      limit: 10, // limit each IP to 5 requests per `window`
      ttl: 60_000,
    },
  } )
  @Post( 'profile-image' )
  @HttpCode( HttpStatus.OK )
  @UseInterceptors(
    FileInterceptor( 'profileImage' ),
  )
  @UseGuards( AuthGuard )
  @Roles( UserRole.ADMIN )
  async setProfileImage ( @Req() req: AuthenticatedRequest, @UploadedFile() file: Express.Multer.File )
  {
    console.log(file);
    
    return await this.authService.setUserImage( file, req.user.id );
  }


}