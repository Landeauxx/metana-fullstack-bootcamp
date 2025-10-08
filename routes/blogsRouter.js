import { Router } from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../db/blogQueries.js';


export const blogsRouter = Router();


// POST /api/blogs
blogsRouter.post('/', async (req, res) => {
try {
const blog = await createBlog(req.body);
res.status(201).json(blog);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// GET /api/blogs
blogsRouter.get('/', async (_req, res) => {
const blogs = await getBlogs();
res.json(blogs);
});


// GET /api/blogs/:id
blogsRouter.get('/:id', async (req, res) => {
const blog = await getBlogById(req.params.id);
if (!blog) return res.status(404).json({ error: 'Blog not found' });
res.json(blog);
});


// PUT /api/blogs/:id
blogsRouter.put('/:id', async (req, res) => {
try {
const updated = await updateBlog(req.params.id, req.body);
if (!updated) return res.status(404).json({ error: 'Blog not found' });
res.json(updated);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// DELETE /api/blogs/:id
blogsRouter.delete('/:id', async (req, res) => {
const deleted = await deleteBlog(req.params.id);
if (!deleted) return res.status(404).json({ error: 'Blog not found' });
res.json(deleted);
});