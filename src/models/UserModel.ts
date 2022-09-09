import { model, Schema } from 'mongoose';

import { IUserModel } from '../interfaces/User';

const UserSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  id: { type: String, required: true },
});

interface UserDocument extends IUserModel, Document {}

export const UserModel = model<UserDocument>('users', UserSchema);
