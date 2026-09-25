import { Router } from 'express';
import { createBlog, getBlogById, listBlogs, updateBlog, deleteBlog } from '../db/blogQueries.js';


const router = Router();


router.get('/', async (req, res, next) => {
try {
const userId = req.query.userId;
const blogs = await listBlogs({ userId });
res.json({ ok: true, data: blogs });
} catch (e) { next(e); }
});


router.get('/:id', async (req, res, next) => {
try {
const blog = await getBlogById(req.params.id);
if (!blog) return res.status(404).json({ ok: false, error: 'Blog not found' });
res.json({ ok: true, data: blog });
} catch (e) { next(e); }
});


router.post('/', async (req, res, next) => {
try {
const created = await createBlog(req.body);
res.status(201).json({ ok: true, data: created });
} catch (e) { next(e); }
});


router.patch('/:id', async (req, res, next) => {
try {
const updated = await updateBlog(req.params.id, req.body);
if (!updated) return res.status(404).json({ ok: false, error: 'Blog not found' });
res.json({ ok: true, data: updated });
} catch (e) { next(e); }
});


router.delete('/:id', async (req, res, next) => {
try {
const ok = await deleteBlog(req.params.id);
if (!ok) return res.status(404).json({ ok: false, error: 'Blog not found' });
res.json({ ok: true });
} catch (e) { next(e); }
});


export default router;