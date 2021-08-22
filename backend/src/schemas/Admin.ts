import { Schema } from 'mongoose';

import { IUserModel, User, UserData } from './User';

export type AdminData = UserData;
export type IAdminModel = IUserModel;

const AdminSchema = new Schema<IAdminModel>({}, { timestamps: true });

export const Admin = User.discriminator<IAdminModel>('Admin', AdminSchema);
