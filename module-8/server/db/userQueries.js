import { query } from './dbconn.js';


export async function createUser({ name, email }) {
const { rows } = await query(
`INSERT INTO users(name, email)
VALUES ($1, $2)
RETURNING *;`,
[name, email]
);
return rows[0];
}


export async function listUsers() {
const { rows } = await query(`SELECT * FROM users ORDER BY created_at DESC;`);
return rows;
}


export async function getUserById(id) {
const { rows } = await query(`SELECT * FROM users WHERE id = $1;`, [id]);
return rows[0] || null;
}


export async function updateUser(id, { name, email }) {
const { rows } = await query(
`UPDATE users
SET name = COALESCE($2, name),
email = COALESCE($3, email)
WHERE id = $1
RETURNING *;`,
[id, name ?? null, email ?? null]
);
return rows[0] || null;
}


export async function deleteUser(id) {
const { rowCount } = await query(`DELETE FROM users WHERE id = $1;`, [id]);
return rowCount > 0;
}


export async function listUsersWithBlogCounts() {
const { rows } = await query(
`SELECT u.*, COUNT(b.id) AS blog_count
FROM users u
LEFT JOIN blogs b ON b.user_id = u.id
GROUP BY u.id
ORDER BY u.created_at DESC;`
);
return rows;
}