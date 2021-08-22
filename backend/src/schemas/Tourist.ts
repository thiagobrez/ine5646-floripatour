import { Schema } from 'mongoose';

import { IUserModel, User, UserData } from './User';

export type TouristData = UserData;
export type ITouristModel = IUserModel;

const TouristSchema = new Schema<ITouristModel>({}, { timestamps: true });

export const Tourist = User.discriminator<ITouristModel>('Tourist', TouristSchema);
