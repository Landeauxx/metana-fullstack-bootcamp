import { Router } from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser, listUsersWithBlogCounts } from '../db/userQueries.js';


const router = Router();


router.get('/', async (req, res, next) => {
try {
const users = req.query.withCounts ? await listUsersWithBlogCounts() : await listUsers();
res.json({ ok: true, data: users });
} catch (e) { next(e); }
});


router.get('/:id', async (req, res, next) => {
try {
const user = await getUserById(req.params.id);
if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
res.json({ ok: true, data: user });
} catch (e) { next(e); }
});


router.post('/', async (req, res, next) => {
try {
const { name, email } = req.body;
const created = await createUser({ name, email });
res.status(201).json({ ok: true, data: created });
} catch (e) { next(e); }
});


router.patch('/:id', async (req, res, next) => {
try {
const updated = await updateUser(req.params.id, req.body);
if (!updated) return res.status(404).json({ ok: false, error: 'User not found' });
res.json({ ok: true, data: updated });
} catch (e) { next(e); }
});


router.delete('/:id', async (req, res, next) => {
try {
const ok = await deleteUser(req.params.id);
if (!ok) return res.status(404).json({ ok: false, error: 'User not found' });
res.json({ ok: true });
} catch (e) { next(e); }
});


export default router;