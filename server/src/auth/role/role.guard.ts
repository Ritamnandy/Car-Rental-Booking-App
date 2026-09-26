import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import type { UserRole } from '../../generated/prisma/enums.js';
import { ROLES_KEY } from './role/role.decorator.js';
import type { AuthenticatedRequest } from '../types/auth-request.types.js';


@Injectable()
export class RoleGuard implements CanActivate
{
  constructor ( private readonly reflector: Reflector ) { }

  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>
  {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>( ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ] );

    // No @Roles() decorator means route is open to any authenticated user
    if ( !requiredRoles )
    {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    return requiredRoles.some( ( role ) => user.role?.includes( role ) );
  }
}