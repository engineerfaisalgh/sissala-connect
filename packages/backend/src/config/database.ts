import knex from 'knex';
import { Logger } from 'pino';
import { logger } from './logger';

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'sissala_connect',
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  },
};

export const db = knex(config);

// Test connection
db.raw('SELECT 1')
  .then(() => logger.info('Database connected successfully'))
  .catch((err) => logger.error('Database connection failed:', err));

export default db;
