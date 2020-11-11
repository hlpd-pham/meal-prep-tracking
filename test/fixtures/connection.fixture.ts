import Knex from 'knex';
import { Tables } from 'src/database/tables.constants';
import * as knexConfigs from '../../src/database/knexfile';

/** Create a new knex instance for testing */
export const getTestConnection = async () => {
  const kn = knexFatory();
};

/** Factory for creating knex connection instance */
export const knexFatory = () => {
  return Knex(knexConfigs['test']);
};

/** Close the given Knex connection */
export const closeConnection = async (kn: Knex) => {
  kn.destroy();
};

/** Migrates the db to latest migration */
export const setupSchema = async (kn: Knex): Promise<Knex> => {
  await kn.migrate.latest();
  await truncateDb(kn);
  return kn;
};

/** Truncates all test tables for given connection, including
 * incrementing ids
 */
export const truncateDb = async (kn: Knex): Promise<Knex> => {
  await Promise.all(
    Object.values(Tables).map(async table => {
      await kn(table).truncate();
      await kn.raw(`UPDATE SQLLITE_SEQUENCE SET SEQ=0 WHERE NAME='${table}'`);
    }),
  );
  return kn;
};

/** Executes the given seed functions aginast the given knex connection. */
// export const seedDb = async(
//     kn: Knex,
//     seed: ((kn: Knex) => Promise<void>)[] = [user]
// )
