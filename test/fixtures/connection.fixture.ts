import Knex from 'knex';
import { Tables } from '../../src/database/tables.constants';
import * as knexConfigs from '../../src/database/knexfile';
import { seed as usersSeed } from '../../src/database/seeds/test_data/user.seed';

/** Create a new knex instance for testing */
export const getTestConnection = async () => {
  const kn = knexFatory();
  return await seedDb(await setupSchema(kn));
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
export const seedDb = async (
  kn: Knex,
  seeds: ((kn: Knex) => Promise<void>)[] = [usersSeed],
): Promise<Knex> => {
  // Ensure usersSeed isn't added twice
  const index = seeds.indexOf(usersSeed);
  if (index < 0) {
    seeds = [...seeds, usersSeed];
  }
  await Promise.all(
    seeds.map(seed => {
      return seed(kn);
    }),
  );
  return kn;
};

/** Truncates and reseeds the db for the given connection */
export const refreshDb = async (
  kn: Knex,
  seeds: ((kn: Knex) => Promise<void>)[] = [],
) => {
  await truncateDb(kn);
  await seedDb(kn, seeds);
  return kn;
};
