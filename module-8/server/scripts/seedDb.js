import { query } from '../db/dbconn.js';


async function seed() {
console.log('Seeding...');


const { rows: userRows } = await query(
`INSERT INTO users (name, email)
VALUES ($1, $2)
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
RETURNING *;`,
['Landon Pratt', 'landon@example.com']
);


const userId = userRows[0].id;


await query(
`INSERT INTO blogs (user_id, title, body, published)
VALUES ($1, $2, $3, $4)
ON CONFLICT DO NOTHING;`,
[userId, 'Hello Postgres', 'First blog in PostgreSQL 🎉', true]
);


console.log('Seed complete ✅');
process.exit(0);
}


seed().catch((e) => {
console.error(e);
process.exit(1);
});