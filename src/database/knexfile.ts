import { Config } from "knex";
import * as path from "path";
import { knexSnakeCaseMappers } from "objection";

module.exports = {
    development: {
      client: "postgresql",
      connection: {
        database: "localhost",
        user: "postgres",
        password: "pass123",
        port: 5432
      }
    },
    migrations: {
        extension: "ts",
        directory: path.join(__dirname, "migrations"),
        tableName: "knex_migrations"
    },
    ...knexSnakeCaseMappers()
} as Config