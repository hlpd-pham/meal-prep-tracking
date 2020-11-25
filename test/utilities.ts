import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { KNEX_CONNECTION } from '@willsoto/nestjs-objection';
import Knex from 'knex';
import { ApiConfig } from 'src/app.config';
import { seedDb, setupSchema } from './fixtures/connection.fixture';
import * as cookieParser from 'cookie-parser';

export const setupTestApp = async (
  appModuleRef: TestingModule,
): Promise<INestApplication> => {
  const app = await appModuleRef.createNestApplication();
  const globalPrefix = ApiConfig.API_GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  return app;
};

export const setupTestDb = async (
  app: INestApplication,
  seeds: ((knex: Knex) => Promise<void>)[],
): Promise<Knex> => {
  const kn = app.get(KNEX_CONNECTION);
  await setupSchema(kn);
  await seedDb(kn, seeds);
  return kn;
};
