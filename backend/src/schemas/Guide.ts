import { Schema } from 'mongoose';

import { IUserModel, User } from './User';

export type GuideData = {
  registryNumber: number;
  email: string;
  phone: string;
  active: boolean;
};

export type IGuideModel = IUserModel & GuideData;

const GuideSchema = new Schema<IGuideModel>(
  {
    registryNumber: Number,
    email: String,
    phone: String,
    active: Boolean,
  },
  { timestamps: true }
);

export const Guide = User.discriminator<IGuideModel>('Guide', GuideSchema);
