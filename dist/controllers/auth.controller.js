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
exports.SignIn = exports.SignUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "Please, send your email and password.",
        });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.json({ success: false, message: "User already exists!" });
    }
    let index = 1;
    yield User_1.default.findOne()
        .sort("-createdAt")
        .exec()
        .then((user) => {
        if (user) {
            index = user.index + 1;
        }
    })
        .catch((err) => {
        console.log("An error occurred:", err);
    });
    const payload = {
        email: req.body.email,
        password: req.body.password,
        index: index,
    };
    const newUser = new User_1.default(payload);
    yield newUser.save();
    res.json({ success: true, token: (0, helper_1.generateToken)(newUser) });
});
exports.SignUp = SignUp;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({ success: false, message: "No Input Data!" });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ success: false, message: "User does not exists!" });
    }
    const isMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (isMatch) {
        return res.json({
            success: true,
            message: "Successfully signed!",
            token: (0, helper_1.generateToken)(user),
        });
    }
    return res.json({
        success: false,
        message: "The email or password are incorrect!",
    });
});
exports.SignIn = SignIn;
