import { Config } from "knex";
import { knexSnakeCaseMappers } from "objection";

module.exports = {
    development: {
      client: "postgresql",
      connection: {
        // database: process.env.DATABASE_NAME,
        // user: process.env.DATABASE_USER,
        // password: process.env.DATABASE_PASSWORD,
        // port: process.env.DATABASE_PORT,
        // host: process.env.DATABASE_HOST,
        database: "postgres",
        user: "mealprepuser",
        password: "imgoingin",
        port: 5432,
        host: "localhost",
      }
    },
    seeds: {
      directory: './seeds'
    }
    ,
    migrations: {
        extension: "ts",
        directory: "migrations",
        tableName: "knex_migrations"
    },
    timezone: 'UTC',
    ...knexSnakeCaseMappers()
} as Config