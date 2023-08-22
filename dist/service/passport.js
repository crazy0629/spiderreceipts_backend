"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
/**
 * StrategyOptions interface
 * Using passport-jwt
 */
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.SECRET_KEY,
};
/**
 * Instance Strategy Class
 */
exports.default = new passport_jwt_1.Strategy(opts, (payload, done) => {
    try {
        const user = User_1.default.findById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        console.log(error);
    }
});
