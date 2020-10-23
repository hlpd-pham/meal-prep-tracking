import { Config } from "knex";
import { knexSnakeCaseMappers } from "objection";

module.exports = {
    test: {
      client: 'pg',
      connection: {
        database: "meal_prep_test",
        user: "postgres",
        password: "pass123",
        host: "localhost",
      },
      migrations: {
        extension: "ts",
        directory: "migrations",
        tableName: "knex_migration"
      },
      seeds: {
        directory: './seeds/test_data'
      }
    },
    development: {
      client: "postgresql",
      connection: {
        database: "postgres",
        user: "mealprepuser",
        password: "imgoingin",
        port: 5432,
        host: "localhost",
      },
      seeds: {
        directory: './seeds/local_data'
      }
      ,
      migrations: {
          extension: "ts",
          directory: "migrations",
          tableName: "knex_migrations"
      },
    },
    timezone: 'UTC',
    ...knexSnakeCaseMappers()
} as Config