import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import { categoriesRouter } from './routers/categories';
import { productsRouter } from './routers/products';
import { usersRouter } from './routers/users';

const app = express();

app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
