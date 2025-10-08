import { connectDB, closeDB } from '../db/dbconn.js';
import { User } from '../models/User.js';
import { Blog } from '../models/Blog.js';

async function seed() {
  await connectDB();

  const name = process.env.SEED_NAME || 'Landon Pratt';
  const email = process.env.SEED_EMAIL || 'landon@example.com';

  console.log('🧹 Clearing blogs (keeping users)...');
  await Blog.deleteMany({});

  console.log('👤 Upserting user...');
  const user = await User.findOneAndUpdate(
    { email },
    { $setOnInsert: { name, email } },
    { new: true, upsert: true }
  );

  console.log('✍️ Inserting sample blogs for this user...');
  await Blog.insertMany([
    { title: 'Hello Metana', content: 'First blog post!', user: user._id },
    { title: 'M5 Tips', content: 'Use models, routers, queries.', user: user._id }
  ]);

  console.log('✅ Seeding complete.');
  await closeDB();
}

seed().catch((e) => {
  console.error('❌ Seeding failed:', e);
  closeDB().finally(() => process.exit(1));
});
