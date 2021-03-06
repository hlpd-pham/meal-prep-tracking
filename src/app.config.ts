export const ApiConfig = {
  RUN_MODE: process.env.RUN_MODE ?? 'DEV',
  API_GLOBAL_PREFIX: process.env.API_GLOBAL_PREFIX ?? 'api/v1',
  API_PORT: parseInt(process.env.API_PORT ?? '3000', 10),
  DB_URL:
    process.env.DB_URL ??
    'postgresql://mealprepuser:pass123@localhost:5432/mealprep_db',
  JWT_SECRET: process.env.JWT_SECRETKEY ?? process.env.JWT_SECRETKEY,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRESIN ?? process.env.JWT_EXPIRESIN,
};
