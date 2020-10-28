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
  timezone: 'UTC',
  ...knexSnakeCaseMappers(),
} as Config;
