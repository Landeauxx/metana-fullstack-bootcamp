import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, minlength: 2, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true }
},
{ timestamps: true }
);


export const User = mongoose.model('User', userSchema);