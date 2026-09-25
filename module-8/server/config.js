import dotenv from 'dotenv';
dotenv.config();


const config = {
port: parseInt(process.env.PORT || '3000', 10),
databaseUrl: process.env.DATABASE_URL,
pg: {
host: process.env.PGHOST || 'localhost',
port: parseInt(process.env.PGPORT || '5432', 10),
database: process.env.PGDATABASE || 'metana_module6',
user: process.env.PGUSER || 'postgres',
password: process.env.PGPASSWORD || 'postgres',
ssl: (process.env.PGSSL || 'false').toLowerCase() === 'true'
}
};


export default config;