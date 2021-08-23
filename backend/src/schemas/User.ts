import { Document, Schema, model } from 'mongoose';

export type UserData = {
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isGuide: boolean;
  isTourist: boolean;
};

export type IUserModel = Document & UserData;

const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: function () {
        return this.type === 'Admin';
      },
    },
    isGuide: {
      type: Boolean,
      default: function () {
        return this.type === 'Guide';
      },
    },
    isTourist: {
      type: Boolean,
      default: function () {
        return this.type === 'Tourist';
      },
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
);

export const User = model<IUserModel>('User', UserSchema);
