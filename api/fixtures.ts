import mongoose from 'mongoose';
import { config } from './config';
import { Category } from './model/Category';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (e) {
    console.log('Skipping drop...');
  }

  await Category.create(
    {
      title: 'iPhone',
    },
    {
      title: 'Macbook',
    },
    {
      title: 'Apple Watch',
    }
  );

  await db.close();
};

run().catch(console.error);
