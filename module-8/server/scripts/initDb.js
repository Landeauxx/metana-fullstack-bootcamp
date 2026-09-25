import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { query } from '../db/dbconn.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function main() {
const sqlPath = resolve(__dirname, 'setup-db.sql');
const sql = readFileSync(sqlPath, 'utf8');
console.log('Initializing database...');
await query(sql);
console.log('DB initialized successfully.');
process.exit(0);
}


main().catch((err) => {
console.error('DB init failed:', err);
process.exit(1);
});