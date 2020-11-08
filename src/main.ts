import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiConfig } from './app.config';
import { AppModule } from './app.module';

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

  await app.listen(ApiConfig.API_PORT);
}

bootstrap();
