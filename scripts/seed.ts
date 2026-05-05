import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import College from '../src/models/College';
import { colleges } from '../data/colleges';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unicompare';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await College.deleteMany({});
    console.log('Cleared existing colleges');

    await College.insertMany(colleges);
    console.log(`Successfully seeded database with ${colleges.length} colleges`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
