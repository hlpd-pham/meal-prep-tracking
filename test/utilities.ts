import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { KNEX_CONNECTION } from '@willsoto/nestjs-objection';
import Knex from 'knex';
import { ApiConfig } from 'src/app.config';

export const setupTestApp = async (
  appModuleRef: TestingModule,
): Promise<INestApplication> => {
  const app = await appModuleRef.createNestApplication();
  const globalPrefix = ApiConfig.API_GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  return app;
};

export const setupTestDb = async (
  app: INestApplication,
  seeds: ((knex: Knex) => Promise<void>)[],
): Promise<Knex> => {
  const kn = app.get(KNEX_CONNECTION);
  return kn;
};
