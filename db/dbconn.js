import mongoose from 'mongoose';
import { config } from '../config.js';


export async function connectDB() {
mongoose.set('strictQuery', true);
await mongoose.connect(config.MONGO_URI, {
autoIndex: true
});
console.log(' MongoDB connected:', mongoose.connection.name);
}


export async function closeDB() {
await mongoose.connection.close();
}