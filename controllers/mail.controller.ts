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
import { bapeEmail } from "../email/bape";
import { brokenEmail } from "../email/broken";
import { burberryEmail } from "../email/burberry";
import { canadaEmail } from "../email/canada";
import { corteizEmail } from "../email/corteiz";
import { doverEmail } from "../email/dover";
import { dysonEmail } from "../email/dyson";
import { ebayEmail } from "../email/ebay";
import { flightEmail } from "../email/flight";
import { gucciEmail } from "../email/gucci";
import { harrodsEmail } from "../email/harrods";
import { yeezyEmail } from "../email/yeezy";
import { luisaEmail } from "../email/luisa";
import { porterEmail } from "../email/porter";
import { pradaEmail } from "../email/prada";
import { ralphEmail } from "../email/ralph";
import { saksEmail } from "../email/saks";
import { samsungEmail } from "../email/samsung";
import { selfridgesEmail } from "../email/selfridges";
import { sp5derEmail } from "../email/sp5der";
import { stüssyEmail } from "../email/stüssy";
import { supremeEmail } from "../email/supreme";
import { vivienneEmail } from "../email/vivienne";

dotenv.config();

const fs = require("fs");
const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

export const sendEmail = async (req: Request, res: Response) => {
  console.log(req.body);
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
  } else if (req.body.type == "bape") {
    html = bapeEmail(req.body.form);
    subject = `Order #LE684-58-${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "broken planet") {
    html = brokenEmail(req.body.form);
    subject = `Order #${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "burberry") {
    html = burberryEmail(req.body.form);
    subject = `Thank you for your order`;
  } else if (req.body.type == "canada goose") {
    html = canadaEmail(req.body.form);
    subject = `Your Canada Goose invoice.`;
  } else if (req.body.type == "corteiz") {
    html = corteizEmail(req.body.form);
    subject = `Order #${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "dover street market") {
    html = doverEmail(req.body.form);
    subject = `DSM E-SHOP Order DSM${req.body.form?.order_number}`;
  } else if (req.body.type == "dyson") {
    html = dysonEmail(req.body.form);
    subject = `Your Dyson order confirmation ${req.body.form?.order_number}`;
  } else if (req.body.type == "ebay") {
    html = ebayEmail(req.body.form);
    subject = `Order confirmed: ${req.body.form?.item}`;
  } else if (req.body.type == "flight club") {
    html = flightEmail(req.body.form);
    subject = `Your Flight Club order #${req.body.form?.order_number}`;
  } else if (req.body.type == "gucci") {
    html = gucciEmail(req.body.form);
    subject = `Order Confirmation #GB${req.body.form?.order_number}`;
  } else if (req.body.type == "harrods") {
    html = harrodsEmail(req.body.form);
    subject = `Thank you for your order`;
  } else if (req.body.type == "yeezy gap") {
    html = yeezyEmail(req.body.form);
    subject = `Your order has been shipped! - YEEZY GAP by Global-e - order number ${req.body.form?.order_number}`;
  } else if (req.body.type == "luisaviaroma") {
    html = luisaEmail(req.body.form);
    subject = `LUISAVIAROMA.COM Order Confirmation: ${req.body.form?.order_number}`;
  } else if (req.body.type == "mr porter") {
    html = porterEmail(req.body.form);
    subject = `Your MR PORTER order confirmation - ${req.body.form?.order_number}`;
  } else if (req.body.type == "prada") {
    html = pradaEmail(req.body.form);
    subject = `Prada - Order acknowledgement - ${req.body.form?.order_number}`;
  } else if (req.body.type == "ralph lauren") {
    html = ralphEmail(req.body.form);
    subject = `Your Ralph Lauren Order ${req.body.form?.order_number}`;
  } else if (req.body.type == "saks fifth avenue") {
    html = saksEmail(req.body.form);
    subject = `Thank you for your order #${req.body.form?.order_number}`;
  } else if (req.body.type == "saks fifth avenue") {
    html = saksEmail(req.body.form);
    subject = `Thank you for your order #${req.body.form?.order_number}`;
  } else if (req.body.type == "samsung") {
    html = samsungEmail(req.body.form);
    subject = `Thanks for ordering from Samsung.com (Order ${req.body.form?.order_number})`;
  } else if (req.body.type == "selfridges") {
    html = selfridgesEmail(req.body.form);
    subject = `Thank you for your order #${req.body.form?.order_number}`;
  } else if (req.body.type == "sp5der") {
    html = sp5derEmail(req.body.form);
    subject = `Order #SP${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "stüssy") {
    html = stüssyEmail(req.body.form);
    subject = `Order #${req.body.form?.order_number} confirmed`;
  } else if (req.body.type == "supreme") {
    html = supremeEmail(req.body.form);
    subject = `online shop order`;
  } else if (req.body.type == "vivienne westwood") {
    html = vivienneEmail(req.body.form);
    subject = `Thank you for your order`;
  }

  const data = {
    from: `${req.body.title} <support@spyderreceipts.com>`,
    to: req.body.form.email,
    subject,
    html,
  };

  mailgun.messages().send(data, (error: Error, body) => {
    if (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Error found while sending emails.",
      });
    }

    const newHistory = {
      userId: req.body.userId,
      email: req.body.form.email,
      title: req.body.type,
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
