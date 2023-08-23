import { Document } from "mongoose";

/**
 * IUser Interface
 * Document class inheritance
 */
export interface IUser extends Document {
  email: string;
  password: string;
  index: number;
}
