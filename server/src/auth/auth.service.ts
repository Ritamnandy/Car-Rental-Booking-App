import { BadRequestException, ConflictException, HttpException, Injectable, Logger, UnauthorizedException, UploadedFile } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { RedisService } from '../redis/redis.service.js';
import { MailService } from '../mail/mail.service.js';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './repository/auth.repository.js';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { apiUserMessage, comparePassword, genarateOtp, hashedCryptoToken, hashPasword, OTP_EXPIRY, otpKey, REGISTER_DATA_EXPIRY, ResetPasswordLink, resetTokenKey, rowCryptoToken, signUpKey } from './constants.js';
import { VerifyEmailDto } from './dto/verifyEmail.dto.js';
import type { JwtPayload, JwtRefreshPayload } from './types/payload.types.js';
import { StringValue } from 'ms';
import { LoginDto } from './dto/login.dto.js';
import { ResendOtpDto } from './dto/resend.dto.js';
import { SetPasswordDto } from './dto/setPassword.dto.js';
import { ImageService } from '../images/images.service.js';

@Injectable()
export class AuthService
{
  private readonly logger = new Logger( AuthService.name )

  constructor (
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly imageService: ImageService
  )
  {
    this.logger.log( 'AuthService initialized' );
  }
  private createPayLoad ( payload: JwtRefreshPayload ): { jwt: JwtPayload, refresh: JwtRefreshPayload }
  {
    const jwt: JwtPayload = {
      id: payload.id,
      email: payload.email,
      role: payload.role
    }
    const refresh: JwtRefreshPayload = {
      id: payload.id,
      email: payload.email,
      role: payload.role
    }
    return { jwt, refresh };
  }

  private async genarateTokenPair ( jwtpayload: JwtPayload, refreshTokenPaload: JwtRefreshPayload ): Promise<{ accessToken: string, refreshToken: string }>
  {
    const accessToken = await this.jwtService.signAsync( jwtpayload, {
      secret: this.configService.getOrThrow<string>( 'JWT_SECRET' ),

      expiresIn: this.configService.getOrThrow<string>( 'JWT_EXPIRES_IN' ) as StringValue
    } );

    const refreshToken = await this.jwtService.signAsync( refreshTokenPaload, {
      secret: this.configService.getOrThrow<string>( 'REFRESH_TOKEN_SECRET' ),

      expiresIn: this.configService.getOrThrow<string>( 'REFRESH_TOKEN_EXPIRES_IN' ) as StringValue
    } );
    await this.authRepository.updateUserRefreshToken( refreshTokenPaload.id, refreshToken )
    return { accessToken, refreshToken };
  }

  private async decodeRefreshToken ( refreshToken: string ): Promise<JwtRefreshPayload>
  {
    try
    {
      const response: JwtRefreshPayload = await this.jwtService.verifyAsync( refreshToken, {
        secret: this.configService.getOrThrow<string>( 'REFRESH_TOKEN_SECRET' )
      } )
      return response
    } catch ( error )
    {
      if ( error instanceof TokenExpiredError )
      {
        throw new UnauthorizedException( 'Refresh token expired' )
      }
      if ( error instanceof JsonWebTokenError )
      {
        throw new UnauthorizedException( `Invalid refresh token` )
      }
      if ( error instanceof NotBeforeError )
      {
        throw new UnauthorizedException( `Refresh token not yet valid` )
      }
      this.logger.error( 'Error decoding refresh token:', error instanceof Error ? error.message : error )
      throw new UnauthorizedException( 'Invalid refresh token' )
    }
  }

  async test ()
  {
    return apiUserMessage( true, 'this is a test message from backend service' );
  }

  async registerUser ( data: CreateAuthDto )
  {
    const existingUser = await this.authRepository.findUserByEmail( data.email )
    if ( existingUser )
    {
      throw new BadRequestException( 'User with this email already exists' )
    }

    const otp = genarateOtp()
    await Promise.all( [
      this.redisService.set( otpKey( data.email ), otp, OTP_EXPIRY ),
      this.redisService.set( signUpKey( data.email ), JSON.stringify( data ), REGISTER_DATA_EXPIRY ),
      this.mailService.sendVerifyEmailMail( data.email, otp )
    ] )

    this.logger.log( `OTP for verify email ${ data.email }` )
    return {
      message: 'OTP sent successfully , please verify your email',
      success: true
    }
  }

  async resendOtp ( data: ResendOtpDto )
  {
    const cacheUser = await this.redisService.get( signUpKey( data.email ) )
    if ( !cacheUser )
    {
      throw new BadRequestException( 'Sign Up Session expired, please register again' )
    }
    const otp = genarateOtp()
    await Promise.all( [
      this.redisService.set( otpKey( data.email ), otp, OTP_EXPIRY ),
      this.mailService.sendVerifyEmailMail( data.email, otp )
    ] )
    this.logger.log( `OTP sent to ${ data.email } for verify email` )
    return {
      message: 'OTP sent successfully , please verify your email',
      success: true
    }
  }

  async verifyEmail ( data: VerifyEmailDto )
  {
    const cacheUser = await this.redisService.get( signUpKey( data.email ) )
    if ( !cacheUser )
    {
      throw new BadRequestException( 'Sign Up Session expired, please register again' )
    }
    const otp = await this.redisService.get( otpKey( data.email ) )
    if ( !otp )
    {
      throw new BadRequestException( 'OTP expired, please request a new one' )
    }
    if ( otp !== data.otp )
    {
      throw new BadRequestException( 'Invalid OTP, Please enter a valid otp' )
    }
    const user = JSON.parse( cacheUser ) as CreateAuthDto
    user.password = await hashPasword( user.password )
    const result = await this.authRepository.createUser( user )
    if ( !result )
    {
      throw new BadRequestException( 'Failed to register user, please try again later' )
    }

    const { jwt: accessTokenPayload, refresh: refreshTokenPayload } = this.createPayLoad( {
      email: result.email,
      id: result.id,
      role: result.role,
    } )

    const { accessToken, refreshToken } = await this.genarateTokenPair( accessTokenPayload, refreshTokenPayload )
    await Promise.all( [
      this.redisService.delete( signUpKey( data.email ) ),
      this.redisService.delete( otpKey( data.email ) ),
      this.mailService.sendWelcomeMail( result.email, result.name )
    ] )
    this.logger.log( `User registered successfully with email ${ data.email }` )

    return apiUserMessage( true, 'User registered successfully', {
      id: result.id,
      name: result.name,
      email: result.email,
      image: result.profileImage,
      createAt: result.createdAt

    }, accessToken, refreshToken )
  }


  async loginUser ( data: LoginDto )
  {
    const result = await this.authRepository.findUserByEmail( data.email )
    if ( !result )
    {
      throw new BadRequestException( 'User with this email does not exist' )
    }

    const isPasswordValid = await comparePassword( data.password, result.password )
    if ( !isPasswordValid )
    {
      throw new BadRequestException( 'Invalid credentials,Please check your password' )
    }

    const { jwt: accessTokenPayload, refresh: refreshTokenPayload } = this.createPayLoad( {
      email: result.email,
      id: result.id,
      role: result.role,
    } )

    const { accessToken, refreshToken } = await this.genarateTokenPair( accessTokenPayload, refreshTokenPayload )

    this.logger.log( `User logged in successfully with email ${ data.email }` )
    await this.mailService.sendWelcomeMail( result.email, result.name )
    return apiUserMessage( true, 'User logged in successfully', {
      id: result.id,
      name: result.name,
      email: result.email,
      image: result.profileImage,
      createAt: result.createdAt

    }, accessToken, refreshToken )
  }

  async logOutUser ( userId: string )
  {
    const result = await this.authRepository.findUserById( userId )
    if ( !result )
    {
      throw new BadRequestException( 'Failed to log out user, User not found' )
    }
    await this.authRepository.logOutUser( userId )
    this.logger.log( `User logged out successfully with userId ${ userId }` )
    return apiUserMessage( true, 'User logged out successfully' )
  }

  async refreshAccessToken ( refreshTokenParam: string )
  {
    const decodedToken = await this.decodeRefreshToken( refreshTokenParam )
    const result = await this.authRepository.findUserByEmail( decodedToken.email )
    if ( !result )
    {
      throw new HttpException( 'User not found', 404 )
    }
    if ( refreshTokenParam !== result.refreshToken )
    {
      throw new HttpException( 'Invalid refresh token', 401 )
    }
    const { jwt: accessTokenPayload, refresh: refreshTokenPayload } = this.createPayLoad( {
      email: result.email,
      id: result.id,
      role: result.role,
    } )

    const { accessToken, refreshToken } = await this.genarateTokenPair( accessTokenPayload, refreshTokenPayload )
    this.logger.log( `User refreshed access token ${ result.email }` )

    return apiUserMessage( true, 'Token refreshed successfully', undefined, accessToken, refreshToken )
  }

  async forgotPassword ( data: ResendOtpDto )
  {
    const result = await this.authRepository.findUserByEmail( data.email )
    if ( !result )
    {
      throw new BadRequestException( 'User not found with this email' )
    }

    const rowToken = rowCryptoToken()
    const hashedToken = hashedCryptoToken( rowToken )
    const link = ResetPasswordLink( rowToken )

    await Promise.all( [
      this.redisService.set( resetTokenKey( hashedToken ), result.email, 60 * 10 ),
      this.mailService.sendResetPasswordMail( result.email, link )
    ] )
    this.logger.log( `Reset password link sent to ${ result.email }` )
    this.logger.log( `Reset password token: ${ rowToken }` )

    return apiUserMessage( true, 'If an account exists with this email, a password reset link has been sent.', )

  }

  async resetPassword ( data: SetPasswordDto )
  {
    const hashedToken = hashedCryptoToken( data.token )
    const cachedEmail = await this.redisService.get( resetTokenKey( hashedToken ) )
    if ( !cachedEmail )
    {
      throw new BadRequestException( 'Invalid or expired reset token' )
    }
    const result = await this.authRepository.findUserByEmail( cachedEmail )
    if ( !result )
    {
      throw new BadRequestException( 'User not found with this email' )
    }

    const hashedPassword = await hashPasword( data.password )
    await Promise.all( [
      this.authRepository.updateUserPassword( result.id, hashedPassword ),
      this.redisService.delete( resetTokenKey( hashedToken ) ),
      this.mailService.sendPasswordChangedMail( result.email )
    ] )
    this.logger.log( `Password reset successfully for ${ cachedEmail }` )
    return apiUserMessage( true, 'Password reset successfully' )
  }

  async getCurrentUser ( userId: string )
  {
    const cachedUser = await this.redisService.get( `user-profile:${ userId }` )
    if ( cachedUser )
    {
      return apiUserMessage( true, 'User found', JSON.parse( cachedUser ) as object )
    }
    const result = await this.authRepository.findUserById( userId )
    if ( !result )
    {
      throw new BadRequestException( 'User not found with this id' )
    }

    await this.redisService.set( `user-profile:${ userId }`, JSON.stringify( {
      id: result.id,
      email: result.email,
      name: result.name,
      image: result.profileImage,
      createAt: result.createdAt
    } ), 60 * 10 )

    return apiUserMessage( true, 'User found', {
      id: result.id,
      email: result.email,
      name: result.name,
      createAt: result.createdAt,
      image: result.profileImage,
    } )
  }


  async setUserImage ( @UploadedFile() file: Express.Multer.File, userId: string )
  {
    const totalStart = performance.now();

    console.log( 'File received:', file.size );


    const imageResult = await this.imageService.uploadImage( file, '/user-profile/image' );
    if ( !imageResult || !imageResult.url )
    {
      throw new ConflictException( 'Failed to upload image, please try again later' );
    }

    const response = await this.authRepository.setUserProfileImage( userId, imageResult.url )

    if ( !response )
    {
      throw new BadRequestException( 'Failed to set user profile image, please try again later' )

    }
    return apiUserMessage( true, 'User profile image set successfully', { imageUrl: response.profileImage } )
  }



}
