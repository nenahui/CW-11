import mongoose, { Types } from 'mongoose';
import { Category } from './Category';
import { User } from './User';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,

    validate: {
      validator: async function (value: Types.ObjectId) {
        const category = Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist',
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

    validate: {
      validator: async function (value: Types.ObjectId) {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model('Product', ProductSchema);
