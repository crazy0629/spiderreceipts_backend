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
exports.sendEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const apple_1 = require("../email/apple");
const balenciaga_1 = require("../email/balenciaga");
const dior_1 = require("../email/dior");
const end_1 = require("../email/end");
const farfetch_1 = require("../email/farfetch");
const hermes_1 = require("../email/hermes");
const goat_1 = require("../email/goat");
const grailed_1 = require("../email/grailed");
const louis_1 = require("../email/louis");
const moncler_1 = require("../email/moncler");
const nike_1 = require("../email/nike");
const snkrs_1 = require("../email/snkrs");
const ssense_1 = require("../email/ssense");
const stadium_1 = require("../email/stadium");
const trapstar_1 = require("../email/trapstar");
const stockx_1 = require("../email/stockx");
dotenv_1.default.config();
const fs = require("fs");
const mailgun = require("mailgun-js")({
    apiKey: process.env.Mailgun_API_KEY,
    domain: "spyderreceipts.com",
});
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const user = yield User_1.default.findById({ _id: req.body.userId });
    if (!user) {
        return res.json({
            success: false,
            message: "User Info is not correct",
        });
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        return res.json({
            success: false,
            message: "You need to activate your account",
        });
    }
    let html = "";
    let subject = "";
    if (req.body.type == "apple") {
        html = (0, apple_1.appleEmail)(req.body.form);
        subject = `We're processing your order ${(_a = req.body.form) === null || _a === void 0 ? void 0 : _a.order_number}`;
    }
    else if (req.body.type == "balenciaga") {
        html = (0, balenciaga_1.balenciagaEmail)(req.body.form);
        subject = "Your Balenciaga Order Confirmed";
    }
    else if (req.body.type == "dior") {
        html = (0, dior_1.diorEmail)(req.body.form);
        subject = "Thank you for your Dior order";
    }
    else if (req.body.type == "end.") {
        html = (0, end_1.endEmail)(req.body.form);
        subject = "Your END. order confirmation";
    }
    else if (req.body.type == "farfetch") {
        if (req.body.form.language == "en") {
            html = (0, farfetch_1.farfetchEngEmail)(req.body.form);
            subject =
                "Thank you for placing your order. Here's what you can expect next";
        }
        else {
            html = (0, farfetch_1.farfetchGerEmail)(req.body.form);
            subject = "Vielen Dank für Ihre Bestellung! So geht es weiter";
        }
    }
    else if (req.body.type == "hermès") {
        html = (0, hermes_1.hermesEmail)(req.body.form);
        subject = "Your Hermès order";
    }
    else if (req.body.type == "goat") {
        html = (0, goat_1.goatEmail)(req.body.form);
        subject = `Your GOAT order #${(_b = req.body.form) === null || _b === void 0 ? void 0 : _b.order_number}`;
    }
    else if (req.body.type == "grailed") {
        html = (0, grailed_1.grailedEmail)(req.body.form);
        subject = "Congrats on your purchase!";
    }
    else if (req.body.type == "louis vuitton") {
        html = (0, louis_1.louisEmail)(req.body.form);
        subject = "Your Louis Vuitton Order";
    }
    else if (req.body.type == "moncler") {
        html = (0, moncler_1.monclerEmail)(req.body.form);
        subject = "Thank you for your order";
    }
    else if (req.body.type == "nike") {
        html = (0, nike_1.nikeEmail)(req.body.form);
        subject = `Order Received (Nike.com #${(_c = req.body.form) === null || _c === void 0 ? void 0 : _c.order_number})`;
    }
    else if (req.body.type == "snkrs") {
        html = (0, snkrs_1.snkrsEmail)(req.body.form);
        subject = `Here's Your Payment Overview for Order ${(_d = req.body.form) === null || _d === void 0 ? void 0 : _d.order_number}`;
    }
    else if (req.body.type == "ssense") {
        html = (0, ssense_1.ssenseEmail)(req.body.form);
        subject = "Thank you for your order";
    }
    else if (req.body.type == "stadium goods") {
        html = (0, stadium_1.stadiumEmail)(req.body.form);
        subject = `Thank you for your Order #${(_e = req.body.form) === null || _e === void 0 ? void 0 : _e.order_number}`;
    }
    else if (req.body.type == "trapstar") {
        html = (0, trapstar_1.trapstarEmail)(req.body.form);
        subject = `Order #TS${(_f = req.body.form) === null || _f === void 0 ? void 0 : _f.order_number} confirmed`;
    }
    else if (req.body.type == "stockx") {
        subject = `🎉Order Delivered: ${(_g = req.body.form) === null || _g === void 0 ? void 0 : _g.item_name} ${(_h = req.body.form) === null || _h === void 0 ? void 0 : _h.size_in_brackets}`;
        if (req.body.form.tax_options == "vat")
            html = (0, stockx_1.stockxVatEmail)(req.body.form);
        else
            html = (0, stockx_1.stockxSalesTaxEmail)(req.body.form);
    }
    const data = {
        from: `${req.body.title} <support@spyderreceipts.com>`,
        to: req.body.form.email,
        subject,
        html,
    };
    mailgun.messages().send(data, (error, body) => {
        if (error) {
            return res.json({
                success: false,
                message: "Error found while sending emails.",
            });
        }
        return res.json({
            success: true,
            message: "Email Successfully sent.",
        });
    });
});
exports.sendEmail = sendEmail;
