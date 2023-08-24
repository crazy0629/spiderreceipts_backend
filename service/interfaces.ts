import { Document } from "mongoose";

/**
 * IUser Interface
 * Document class inheritance
 */
export interface IUser extends Document {
  email: string;
  password: string;
  deposit: number;
  isActive: boolean;
  expireDate: Date;
  role: number;
  isVerified: boolean;
  token: string;
}
