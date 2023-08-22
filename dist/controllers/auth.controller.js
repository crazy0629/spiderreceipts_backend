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
exports.SignUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
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
    let length = 0;
    yield User_1.default.find()
        .countDocuments()
        .then((data) => (length = data));
    const payload = {
        email: req.body.email,
        password: req.body.password,
        index: length + 1,
    };
    const newUser = new User_1.default(payload);
    yield newUser.save();
    res.json({ success: true, token: (0, helper_1.generateToken)(newUser) });
});
exports.SignUp = SignUp;
