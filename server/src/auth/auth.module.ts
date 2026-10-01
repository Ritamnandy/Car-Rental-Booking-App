import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { AuthRepository } from './repository/auth.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { MailModule } from '../mail/mail.module.js';
import { AuthGuard } from './authguard/auth.guard.js';
import { ImagesModule } from '../images/images.module.js';
import { RoleGuard } from './roleguard/role.guard.js';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy.js';

@Module( {
  imports: [ PrismaModule, RedisModule, MailModule, ImagesModule, PassportModule ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthRepository, AuthGuard, RoleGuard, GoogleStrategy ],
  exports: [ AuthGuard, RoleGuard ]
} )
export class AuthModule { }
