import * as mongoose from 'mongoose';

export interface IUser {
  email: string,
  password?: string,
  loginToken?: string | null,
  createdAt: Date,
};

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  loginToken: String,
  createdAt: Date,
});

const User = mongoose.model<IUser>('Users', UserSchema);
export default User;