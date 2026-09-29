import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { AuthRepository } from './repository/auth.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { MailModule } from '../mail/mail.module.js';
import { AuthGuard } from './authguard/auth.guard.js';
import { ImagesModule } from '../images/images.module.js';

@Module( {
  imports: [ PrismaModule, RedisModule, MailModule,ImagesModule ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthRepository, AuthGuard ],
  exports: [ AuthGuard ]
} )
export class AuthModule { }
