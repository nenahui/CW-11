import express from 'express';
import mongoose from 'mongoose';
import { User } from '../model/User';
import { imagesUpload } from '../multer';

export const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phone: req.body.phone,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Username not found!' });
    }

    if (!req.body.password) {
      return res.status(400).send({ error: 'Password is required!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
