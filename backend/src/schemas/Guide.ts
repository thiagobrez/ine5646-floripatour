import { Schema } from 'mongoose';

import { IUserModel, User, UserData } from './User';

export type GuideData = UserData & {
  registryNumber: number;
  email: string;
  phone: string;
  active: boolean;
  isFirstLogin: boolean;
};

export type IGuideModel = IUserModel & GuideData;

const GuideSchema = new Schema<IGuideModel>(
  {
    registryNumber: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    active: { type: Boolean, default: true },
    isFirstLogin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Guide = User.discriminator<IGuideModel>('Guide', GuideSchema);
