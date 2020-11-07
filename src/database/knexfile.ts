import { Config } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { ApiConfig } from 'src/app.config';

module.exports = {
  development: {
    client: 'postgresql',
    connection: ApiConfig.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: './seeds/local_data',
    },
    migrations: {
      extension: 'ts',
      directory: 'migrations',
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migration: {
      directory: 'migrations',
      extenstion: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/test_data',
    },
  },
  timezone: 'UTC',
  ...knexSnakeCaseMappers(),
} as Config;
