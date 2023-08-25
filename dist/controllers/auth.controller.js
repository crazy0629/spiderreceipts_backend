"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = exports.checkEmailVerified = exports.resendVeriEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto = require("crypto");
const mailgun = require("mailgun-js")({
    apiKey: process.env.Mailgun_API_KEY,
    domain: "spyderreceipts.com",
});
const sendVerificationEmail = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    const link = `${process.env.HOST_URL}/verify?token=${token}&email=${email}`;
    const data = {
        from: "SpyderReceipts <support@spyderreceipts.com>",
        to: email,
        subject: "Email Verification",
        text: `Please click on the following link to verify your email: ${link}`,
    };
    yield mailgun.messages().send(data, (error, body) => {
        if (error) {
            return 0;
        }
        return 1;
    });
});
const resendVeriEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "Error happened while resending verification email",
        });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    yield user.save();
    yield sendVerificationEmail(token, user.email);
    return res.json({
        success: true,
        message: "Verification email is successfully resent",
    });
});
exports.resendVeriEmail = resendVeriEmail;
const checkEmailVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        email: req.body.email,
        token: req.body.token,
    });
    if (!user) {
        return res.json({
            success: false,
            message: "Verification Failed, resend your verification email",
        });
    }
    user.isVerified = true;
    yield user.save();
    return res.json({
        success: true,
        message: "You have successfully verfied your email.",
    });
});
exports.checkEmailVerified = checkEmailVerified;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "Please, send your email and password.",
        });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (user && user.isVerified) {
        return res.json({ success: false, message: "User already exists!" });
    }
    if (user && !user.isVerified) {
        yield sendVerificationEmail(user.token, user.email);
        return res.json({
            success: true,
            message: "Please check your inbox and verify your email",
        });
    }
    let role = 0;
    if (req.body.email == process.env.ADMIN_EMAIL1 ||
        req.body.email == process.env.ADMIN_EMAIL2 ||
        req.body.email == process.env.ADMIN_EMAIL3) {
        role = 1;
    }
    const token = crypto.randomBytes(20).toString("hex");
    const payload = {
        email: req.body.email,
        password: req.body.password,
        deposit: 0,
        role,
        isActive: false,
        expireDate: Date.now(),
        isVerified: false,
        token: token,
    };
    const newUser = new User_1.default(payload);
    yield newUser.save();
    yield sendVerificationEmail(token, req.body.email);
    return res.json({
        success: true,
        message: "Please check your inbox and verify your email",
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "No Input Data!",
            verifyIssue: false,
        });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "User does not exists!",
            verifyIssue: false,
        });
    }
    if (user && !user.isVerified) {
        yield sendVerificationEmail(user.token, user.email);
        return res.json({
            success: false,
            message: "You need to verify your email",
            verifyIssue: true,
        });
    }
    const isMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (isMatch) {
        const currentDate = new Date();
        if (user.expireDate < currentDate) {
            user.isActive = false;
            yield user.save();
        }
        return res.json({
            success: true,
            message: "Successfully signed!",
            role: user.role,
            token: (0, helper_1.generateToken)(user),
        });
    }
    return res.json({
        success: false,
        message: "The email or password are incorrect!",
    });
});
exports.signIn = signIn;
