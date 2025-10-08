import { Blog } from '../models/Blog.js';


export const createBlog = async (data) => Blog.create(data);
export const getBlogs = async () => Blog.find().populate('user', 'name email').lean();
export const getBlogById = async (id) => Blog.findById(id).populate('user', 'name email').lean();
export const updateBlog = async (id, data) => Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
export const deleteBlog = async (id) => Blog.findByIdAndDelete(id).lean();