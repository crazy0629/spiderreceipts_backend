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
exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { Mailgun_API_KEY } from "../config";
// const nodemailer = require("nodemailer");
// const fs = require("fs");
// const mailgun = require("mailgun-js")({
//   apiKey: Mailgun_API_KEY,
//   domain: "bitpool.gg",
// });
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        isActive: false,
        expireDate: Date.now(),
    };
    const newUser = new User_1.default(payload);
    yield newUser.save();
    res.json({ success: true, message: "Successfully registered!" });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({ success: false, message: "No Input Data!" });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ success: false, message: "User does not exists!" });
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
            token: (0, helper_1.generateToken)(user),
        });
    }
    return res.json({
        success: false,
        message: "The email or password are incorrect!",
    });
});
exports.signIn = signIn;
// export const sendEmail = async (req: Request, res: Response) => {
//   const html = fs.readFileSync(`${__dirname}\\hello.html`, {
//     encoding: "utf8",
//     flag: "r",
//   });
// const data = {
//   from: "bitpool@mail.bitsport.gg",
//   to: "milan.jansen0629@gmail.com",
//   subject: "Hello",
//   html: html, // Pass the HTML file content here
// };
// mailgun.messages().send(data, (error: Error, body) => {
//   if (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//     });
//   }
//   console.log(body);
//   return res.json({
//     success: true,
//   });
// });
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "milan.jansen0629@gmail.com",
//       pass: "20010629crazy",
//     },
//   });
//   const mailOptions = {
//     from: "milan.jansen0629@gmail.com",
//     to: "kenzo.egghead@gmail.com",
//     subject: "HTML Email Example",
//     html: html,
//   };
//   transporter.sendMail(mailOptions, function (error: any, info: any) {
//     if (error) {
//       console.log(error);
//       return res.json({
//         success: false,
//       });
//     } else {
//       console.log("Email sent: " + info.response);
//       return res.json({
//         success: true,
//       });
//     }
//   });
// };
