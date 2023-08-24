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
      deposit: user.deposit,
      isActive: user.isActive,
      expireDate: user.expireDate,
      role: user.role,
      isVerified: user.isVerified,
      token: user.token,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};
