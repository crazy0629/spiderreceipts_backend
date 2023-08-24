"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Generate User Token Infomation by jsonwebtoken
 * @param user
 * @returns
 */
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        password: user.password,
        deposit: user.deposit,
        isActive: user.isActive,
        expireDate: user.expireDate,
        role: user.role,
        isVerified: user.isVerified,
        token: user.token,
    }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
    });
};
exports.generateToken = generateToken;
