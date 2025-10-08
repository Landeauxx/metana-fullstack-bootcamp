import { User } from '../models/User.js';


export const createUser = async (data) => User.create(data);
export const getUsers = async () => User.find().lean();
export const getUserById = async (id) => User.findById(id).lean();
export const updateUser = async (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
export const deleteUser = async (id) => User.findByIdAndDelete(id).lean();