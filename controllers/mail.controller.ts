import { Request, Response } from "express";
import User from "../models/User";
import EmailHistory from "../models/EmailHistory";
import path from "path";
import dotenv from "dotenv";
import { appleEmail } from "../email/apple";
import { balenciagaEmail } from "../email/balenciaga";
import { diorEmail } from "../email/dior";
import { endEmail } from "../email/end";
import { farfetchEngEmail, farfetchGerEmail } from "../email/farfetch";
import { hermesEmail } from "../email/hermes";
import { goatEmail } from "../email/goat";
import { grailedEmail } from "../email/grailed";
import { louisEmail } from "../email/louis";
import { monclerEmail } from "../email/moncler";
import { nikeEmail } from "../email/nike";
import { snkrsEmail } from "../email/snkrs";
import { ssenseEmail } from "../email/ssense";
import { stadiumEmail } from "../email/stadium";
import { trapstarEmail } from "../email/trapstar";
import { stockxSalesTaxEmail, stockxVatEmail } from "../email/stockx";

dotenv.config();

const fs = require("fs");
const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

export const getMailHistory = async (req: Request, res: Response) => {
  await EmailHistory.find({ userId: req.body.userId }).then((models: any) => {
    res.json({ models });
  });
};

export const sendEmail = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.body.userId });
  if (!user) {
    return res.json({
      success: false,
      message: "User Info is not correct",
    });
  }
  if (!user?.isActive) {
    return res.json({
      success: false,
      message: "You need to activate your account",
    });
  }

  let html = "";
  let subject = "";

  if (req.body.type == "apple") {
    html = appleEmail(req.body.form);
    subject = `We're processing your order ${req.body.form?.order_number}`;
  } else if (req.body.type == "balenciaga") {
    html = balenciagaEmail(req.body.form);
    subject = "Your Balenciaga Order Confirmed";
  } else if (req.body.type == "dior") {
    html = diorEmail(req.body.form);
    subject = "Thank you for your Dior order";
  } else if (req.body.type == "end.") {
    html = endEmail(req.body.form);
    subject = "Your END. order confirmation";
  } else if (req.body.type == "farfetch") {
    if (req.body.form.language == "en") {
      html = farfetchEngEmail(req.body.form);
      subject =
        "Thank you for placing your order. Here's what you can expect next";
    } else {
      html = farfetchGerEmail(req.body.form);
      subject = "Vielen Dank für Ihre Bestellung! So geht es weiter";
    }
  } else if (req.body.type == "hermès") {
    html = hermesEmail(req.body.form);
    subject = "Your Hermès order";
  } else if (req.body.type == "goat") {
    html = goatEmail(req.body.form);
    subject = `Your GOAT order #${req.body.form?.order_number}`;
  } else if (req.body.type == "grailed") {
    html = grailedEmail(req.body.form);
    subject = "Congrats on your purchase!";
  } else if (req.body.type == "louis vuitton") {
    html = louisEmail(req.body.form);
    subject = "Your Louis Vuitton Order";
  } else if (req.body.type == "moncler") {
    html = monclerEmail(req.body.form);
    subject = "Thank you for your order";
  } else if (req.body.type == "nike") {
    html = nikeEmail(req.body.form);
    subject = `Order Received (Nike.com #${req.body.form?.order_number})`;
  } else if (req.body.type == "snkrs") {
    html = snkrsEmail(req.body.form);
    subject = `Here's Your Payment Overview for Order ${req.body.form?.order_number}`;
  } else if (req.body.type == "ssense") {
    html = ssenseEmail(req.body.form);
    subject = "Thank you for your order";
  } else if (req.body.type == "stadium goods") {
    html = stadiumEmail(req.body.form);
    subject = `Thank you for your Order #${req.body.form?.order_number}`;
  } else if (req.body.type == "trapstar") {
    html = trapstarEmail(req.body.form);
    subject = `Order #TS${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "stockx") {
    subject = `🎉Order Delivered: ${req.body.form?.item_name} ${req.body.form?.size_in_brackets}`;
    if (req.body.form.tax_options == "vat")
      html = stockxVatEmail(req.body.form);
    else html = stockxSalesTaxEmail(req.body.form);
  }

  const data = {
    from: `${req.body.title} <support@spyderreceipts.com>`,
    to: req.body.form.email,
    subject,
    html,
  };

  mailgun.messages().send(data, (error: Error, body) => {
    if (error) {
      return res.json({
        success: false,
        message: "Error found while sending emails.",
      });
    }

    const newHistory = {
      userId: req.body.userId,
      email: req.body.email,
      sentDate: Date.now(),
    };

    const newMHistory = new EmailHistory(newHistory);
    newMHistory.save();

    return res.json({
      success: true,
      message: "Email Successfully sent.",
    });
  });
};
