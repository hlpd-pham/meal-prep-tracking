import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiConfig } from './app.config';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global route prefix
  const globalPrefix = ApiConfig.API_GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  // Swagger Init
  const options = new DocumentBuilder()
    .setTitle('Meal Prep Tracker')
    .setDescription('Meal Prep Tracker API')
    .setVersion('1.0')
    .addTag('customers', 'Customer endpoints')
    .addTag('deliver-persons', 'Deliver person endpoints')
    .addTag('dishes', 'Dish endpoints')
    .addTag('orders', 'Order endpoints')
    .addTag('auth', 'Auth endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

  // Setup session
  const appConfig = app.get<ConfigService>(ConfigService);
  app.use(
    session({
      secret: appConfig.get<string>('JWT_SECRETKEY'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Setup cookie
  app.use(cookieParser());

  await app.listen(ApiConfig.API_PORT);
}

bootstrap();
