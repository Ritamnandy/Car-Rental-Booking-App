import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import type { AuthenticatedRequest } from '../types/auth-request.types.js';
import { JsonWebTokenError, TokenExpiredError, JwtService, NotBeforeError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate
{
  private readonly logger = new Logger( AuthGuard.name )

  constructor (
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async canActivate (
    context: ExecutionContext,
  ): Promise<boolean>
  {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const token = this.extractToken( request )
    if ( !token )
    {
      this.logger.warn( 'No authentication token found' )
      throw new UnauthorizedException( 'No authentication token found' )
    }

    try
    {
      const secret = this.configService.getOrThrow<string>( 'JWT_SECRET' );
      if ( !secret )
      {
        this.logger.error( 'JWT_SECRET is not configured' );
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync( token, {
        secret
      } )
      request.user = payload
    } catch ( error )
    {
      if ( error instanceof TokenExpiredError )
      {
        throw new UnauthorizedException( 'Access token has expired' );
      }
      if ( error instanceof NotBeforeError )
      {
        throw new UnauthorizedException( 'Access token is not yet valid' );
      }
      if ( error instanceof JsonWebTokenError )
      {
        throw new UnauthorizedException( 'Invalid access token provided' );
      }
      this.logger.warn( 'Invalid authentication token' )
      throw new UnauthorizedException()
    }




    return true
  }


  private extractToken ( request: AuthenticatedRequest ): string | undefined
  {
    const cookieHeader = request.cookies[ 'accessToken' ]
    console.log( "inside cookie:-",cookieHeader);
    
    if ( cookieHeader )
    {
      return cookieHeader
    }
    return this.extractTokenFromHeader( request )
  }


  private extractTokenFromHeader ( request: AuthenticatedRequest ): string | undefined
  {
    const authHeader = request.header( 'Authorization' )
    if ( !authHeader )
    {
      return undefined
    }
    const [ type, token ] = authHeader.split( ' ' )
    console.log("inside header:-", type );
    console.log( "inside header:-",token );
    if ( type !== 'Bearer' )
    {
      return undefined
    }
    return token
  }
}

