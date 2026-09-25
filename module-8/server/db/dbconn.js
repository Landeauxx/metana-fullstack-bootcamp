import pkg from 'pg';
import config from '../config.js';
const { Pool } = pkg;


const pool = config.databaseUrl
? new Pool({ connectionString: config.databaseUrl, ssl: config.pg.ssl ? { rejectUnauthorized: false } : false })
: new Pool({
host: config.pg.host,
port: config.pg.port,
database: config.pg.database,
user: config.pg.user,
password: config.pg.password,
ssl: config.pg.ssl ? { rejectUnauthorized: false } : false
});


pool.on('error', (err) => {
console.error('Unexpected PG error on idle client', err);
process.exit(-1);
});


export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();