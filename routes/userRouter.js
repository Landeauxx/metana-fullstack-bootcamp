import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../db/userQueries.js';


export const userRouter = Router();


// POST /api/users
userRouter.post('/', async (req, res) => {
try {
const user = await createUser(req.body);
res.status(201).json(user);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// GET /api/users
userRouter.get('/', async (_req, res) => {
const users = await getUsers();
res.json(users);
});


// GET /api/users/:id
userRouter.get('/:id', async (req, res) => {
const user = await getUserById(req.params.id);
if (!user) return res.status(404).json({ error: 'User not found' });
res.json(user);
});


// PUT /api/users/:id
userRouter.put('/:id', async (req, res) => {
try {
const updated = await updateUser(req.params.id, req.body);
if (!updated) return res.status(404).json({ error: 'User not found' });
res.json(updated);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// DELETE /api/users/:id
userRouter.delete('/:id', async (req, res) => {
const deleted = await deleteUser(req.params.id);
if (!deleted) return res.status(404).json({ error: 'User not found' });
res.json(deleted);
});