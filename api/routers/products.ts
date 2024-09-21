import { Router } from 'express';
import mongoose from 'mongoose';
import { auth, type RequestWithUser } from '../middleware/auth';
import { Product } from '../model/Product';
import { imagesUpload } from '../multer';

export const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter);

    return res.send(products);
  } catch (error) {
    return next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'title')
      .populate('user', 'displayName phone');

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    if (!product.user._id.equals(user._id)) {
      return res.status(403).send({ error: 'Forbidden' });
    }

    await Product.deleteOne({ _id: product._id });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

productsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).send({ error: 'Image is required' });
    }

    const product = new Product({
      user: user._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      price: parseFloat(req.body.price),
    });
    await product.save();

    return res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});
