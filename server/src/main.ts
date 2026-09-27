import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap ()
{
  const app = await NestFactory.create( AppModule, { bufferLogs: true } );
  app.setGlobalPrefix( 'api/v1' );
  app.use( cookieParser() );
  app.use( compression() );
  app.use( helmet() );
  app.enableCors( {
    origin: process.env.COR_ORIGIN,
    credentials: true,
  } );
  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    } ),
  );

  const config = new DocumentBuilder()
    .setTitle( 'Car Rental Booking App API' )
    .setDescription( 'API documentation for the Car Rental Booking Application' )
    .setVersion( '1.0' )
    .build();
  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'api/docs', app, document );
  app.enableShutdownHooks();
  await app.listen( process.env.PORT ?? 3000, () =>
  {
    console.log( 'Server started on port', process.env.PORT ?? 3000 );

  } );
}
await bootstrap();
