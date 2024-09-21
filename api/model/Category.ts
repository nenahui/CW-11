import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = mongoose.model('Category', CategorySchema);
