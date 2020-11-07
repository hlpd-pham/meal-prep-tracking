import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiConfig } from './app.config';
import { AppModule } from './app.module';
import * as winston from 'winston';
const chalk = require('chalk');

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

/** Log format for local dev */
const localWinstonFormatter = winston.format.printf(info => {
  let msgColor;
  switch (info.level) {
    case 'debug':
      msgColor = 'gray';
      break;
    case 'info':
      msgColor = 'green';
      break;
    case 'warn':
      msgColor = 'yellow';
      break;
    default:
      msgColor = 'red';
      break;
  }
  let level = `[${info.level.toUpperCase()}]`;
  let timestamp = new Date(info.timestap).toLocaleTimeString();
  let context =
    typeof info.context === 'object'
      ? info.context['context'] ?? 'Unknown'
      : info.context;
  let data;
  data = typeof info.context === 'object' ? JSON.stringify(info.context) : '';
  return `${chalk[msgColor](level)} ${timestamp} ${chalk.cyan(
    '[' + context + ']',
  )} ${chalk[msgColor](info.message)} ${data}`;
});

bootstrap();
