import { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const fs = require("fs");
const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

export const sendEmail = async (req: Request, res: Response) => {
  const emailPath = path.resolve("../spiderreceipts_backend/email");

  const html = fs.readFileSync(emailPath + "/hello.html", {
    encoding: "utf8",
    flag: "r",
  });

  const data = {
    from: " support@spyderreceipts.com",
    to: "milan.jansen0629@gmail.com",
    subject: "Hello",
    html: html,
  };

  mailgun.messages().send(data, (error: Error, body) => {
    if (error) {
      console.log(error);
      return res.json({
        success: false,
      });
    }
    console.log(body);
    return res.json({
      success: true,
    });
  });
};
