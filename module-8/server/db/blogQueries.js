import { query } from './dbconn.js';


export async function createBlog({ user_id, title, body, published = false }) {
const { rows } = await query(
`INSERT INTO blogs(user_id, title, body, published)
VALUES ($1, $2, $3, $4)
RETURNING *;`,
[user_id, title, body, published]
);
return rows[0];
}


export async function getBlogById(id) {
const { rows } = await query(
`SELECT b.*, jsonb_build_object('id', u.id, 'name', u.name, 'email', u.email) AS author
FROM blogs b
JOIN users u ON u.id = b.user_id
WHERE b.id = $1;`,
[id]
);
return rows[0] || null;
}


export async function listBlogs({ userId } = {}) {
const params = [];
let where = '';
if (userId) {
params.push(userId);
where = `WHERE b.user_id = $${params.length}`;
}
const { rows } = await query(
`SELECT b.*, jsonb_build_object('id', u.id, 'name', u.name) AS author
FROM blogs b
JOIN users u ON u.id = b.user_id
${where}
ORDER BY b.created_at DESC;`,
params
);
return rows;
}


export async function updateBlog(id, { title, body, published }) {
const { rows } = await query(
`UPDATE blogs
SET title = COALESCE($2, title),
body = COALESCE($3, body),
published = COALESCE($4, published)
WHERE id = $1
RETURNING *;`,
[id, title ?? null, body ?? null, published ?? null]
);
return rows[0] || null;
}


export async function deleteBlog(id) {
const { rowCount } = await query(`DELETE FROM blogs WHERE id = $1;`, [id]);
return rowCount > 0;
}