import JwtWebToken from "jsonwebtoken";
import { IUser } from "../service/interfaces";
import dotenv from "dotenv";

dotenv.config();
/**
 * Generate User Token Infomation by jsonwebtoken
 * @param user
 * @returns
 */

export const generateToken = (user: IUser) => {
  return JwtWebToken.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
      index: user.index,
      isActive: user.isActive,
      expireDate: user.expireDate,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};
