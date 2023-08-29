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
exports.activateAccount = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById({ _id: req.body.userId });
    if (!user) {
        res.json({
            success: false,
            message: "User Info is not correct",
        });
    }
    else {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + req.body.month * 30);
        user.expireDate = expireDate;
        user.isActive = true;
        try {
            const paymentIntent = yield stripe.paymentIntents.create({
                amount: req.body.money * 100,
                currency: "usd",
                payment_method: req.body.paymentMethod,
                return_url: process.env.HOST_URL,
                confirm: true,
            });
            user.deposit += req.body.money;
            yield user.save();
            res.json({
                success: true,
                client_secret: paymentIntent.client_secret,
                token: (0, helper_1.generateToken)(user),
                message: `Successfully activated. Your account's activate date is ${new Date(user.expireDate).toDateString()}`,
            });
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ success: false, message: "Please enter correct card info" });
        }
    }
});
exports.activateAccount = activateAccount;
