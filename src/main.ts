import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

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
  await app.listen(3000);
}
bootstrap();
