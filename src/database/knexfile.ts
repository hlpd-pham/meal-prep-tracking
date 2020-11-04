import { Config } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'mealprep_db',
      user: 'mealprepuser',
      password: 'pass123',
      port: 5432,
      host: 'localhost',
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
