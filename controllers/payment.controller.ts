import dotenv from "dotenv";

import { Request, Response } from "express";
import { Client, Environment } from "square";
import { randomUUID } from "crypto";

dotenv.config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export const sendMoney = async (req: Request, res: Response) => {
  try {
    console.log(req.body.sourceId);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(req.body.amount * 100),
      },
    });

    sendEmail(
      req.body.email,
      result?.payment?.createdAt,
      result?.payment?.totalMoney?.amount?.toString(),
      result?.payment?.totalMoney?.currency,
      result?.payment?.orderId,
      result?.payment?.receiptUrl
    );

    res.json({
      success: true,
      data: {
        date: result?.payment?.createdAt,
        amount: result?.payment?.totalMoney?.amount?.toString(),
        currency: result?.payment?.totalMoney?.currency,
        orderId: result?.payment?.orderId,
        status: result?.payment?.status,
        receiptUrl: result?.payment?.receiptUrl,
      },
    });
  } catch (error) {
    res.json({ data: error });
  }
};

const sendEmail = async (
  email: any,
  date: any,
  amount: any,
  currency: any,
  orderId: any,
  transaction: any
) => {
  console.log(email, date, amount, currency, orderId, transaction);
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <title>Completed Payment</title>
    <style>
      * {
        font-family: "Roboto", sans-serif;
        box-sizing: border-box;
      }

      div.root {
        max-width: 768px;
        margin: auto;
        width: 100%;
      }

      body {
        padding: 100px;
        margin: 0;
      }

      img.logo {
        margin-bottom: 90px;
      }

      h1.title {
        color: #000;
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 64px;
      }

      div.footer {
        text-align: center;
        max-width: 508px;
        width: 100%;
        margin: auto;

        margin-top: 50px;
      }

      div.link {
        margin-bottom: 32px;
      }

      div.link a {
        color: #000;
        font-size: 16px;
        font-weight: 400;
        display: inline-block;
        margin: 0 20px;
        text-decoration: none;
      }

      div.container {
        width: 100%;

        border: 1px solid gray;
        border-radius: 20px;
        padding: 20px;
      }
      div.header {
        display: inline;
        font-size: 25px;
        font-weight: 600;
      }
      div.row {
        width: 100%;
        margin-bottom: 20px;
     }
      div.detail {
        display: inline;
        font-size: 25px;
        font-weight: 400;
      }
      div.detail span {
        font-size: 25px;
        font-weight: 600;
        margin-right: 5px;
      }
      a.transaction {
        font-size: 25px;
        font-weight: 600;
        text-decoration: underline;
        color: #69b1ff;
      }
    </style>
  </head>

  <body>
    <div class="root">
      <img src="https://i.ibb.co/9cjWCNz/logo.png" alt="logo" class="logo" />
      <h1 class="title">SPYDER RECEIPTS</h1>
      <div class="container">
        <div class="row">
          <div class="header">Email:</div>
          <div class="detail">${email}</div>
        </div>
        <div class="row">
          <div class="header">Date:</div>
          <div class="detail">${date}</div>
        </div>
        <div class="row">
          <div class="header">Amount:</div>
          <div class="detail"><span>${amount}</span>${currency}</div>
        </div>
        <div class="row">
          <div class="header">OrderID:</div>
          <div class="detail">${orderId}</div>
        </div>
        <div class="row">
          <a class="transaction" href="${transaction}" target="_blank"
            >View Transaction</a
          >
        </div>
      </div>
      <div class="footer">
        <div class="link">
          <a href="#">Privacy Policy</a> | <a href="#">Contact Support</a>
        </div>
      </div>
    </div>
  </body>
</html>

  `;

  const data = {
    from: "Spyder <support@spyderreceipts.com>",
    to: email,
    subject: "Completed Payment",
    html,
  };

  mailgun.messages().send(data);
};
