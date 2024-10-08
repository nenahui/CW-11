import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import type { UserFields, UserMethods, UserModel } from '../types';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('username')) {
          return true;
        }

        const user = await User.findOne({ username: value });
        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  token: String,
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
