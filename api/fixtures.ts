import mongoose from 'mongoose';
import { config } from './config';
import { Category } from './model/Category';
import { Product } from './model/Product';
import { User } from './model/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [kanat, argen, jack] = await User.create(
    {
      username: 'kanat',
      password: '123qwe',
      displayName: 'Sydykov Kanat',
      phone: '0502539534',
    },
    {
      username: 'argen',
      password: '123qwe',
      displayName: 'Ashimov Argen',
      phone: '0776294224',
    },
    {
      username: 'jack',
      password: '123qwe',
      displayName: 'Jack Daniels',
      phone: '0555381490',
    }
  );

  const [iphone, macbook, appleWatch] = await Category.create(
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

  await Product.create(
    {
      title: 'iPhone 12 Pro Max',
      description: 'The best iPhone ever',
      image: 'fixtures/iphone12promax.webp',
      price: 1500,
      category: iphone._id,
      user: kanat._id,
    },
    {
      title: 'Macbook Pro 2021',
      description: 'The best Macbook ever',
      image: 'fixtures/macbookpro2021.webp',
      price: 2500,
      category: macbook._id,
      user: argen._id,
    },
    {
      title: 'Apple Watch Series 6',
      description: 'The best Apple Watch ever',
      image: 'fixtures/watch10.jpg',
      price: 500,
      category: appleWatch._id,
      user: jack._id,
    },
    {
      title: 'iPhone 15 Pro',
      description: 'The best iPhone ever',
      image: 'fixtures/iphone15pro.webp',
      price: 1200,
      category: iphone._id,
      user: kanat._id,
    },
    {
      title: 'Macbook Air 2021',
      description: 'The best Macbook ever',
      image: 'fixtures/macair.webp',
      price: 1500,
      category: macbook._id,
      user: argen._id,
    },
    {
      title: 'Apple Watch Ultra',
      description: 'The best Apple Watch ever',
      image: 'fixtures/watchultra.jpg',
      price: 400,
      category: appleWatch._id,
      user: jack._id,
    },
    {
      title: 'iPhone 16 Plus',
      description: 'The best iPhone ever',
      image: 'fixtures/iphone16.jpg',
      price: 1300,
      category: iphone._id,
      user: kanat._id,
    },
    {
      title: 'Macbook Pro 2020',
      description: 'The best Macbook ever',
      image: 'fixtures/macpro2.webp',
      price: 2000,
      category: macbook._id,
      user: argen._id,
    }
  );

  await db.close();
};

run().catch(console.error);
