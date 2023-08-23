import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

/**
 * StrategyOptions interface
 * Using passport-jwt
 */
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

/**
 * Instance Strategy Class
 */
export default new Strategy(opts, (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
