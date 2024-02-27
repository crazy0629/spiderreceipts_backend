import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import { generateToken } from "../service/helper";
import dotenv from "dotenv";
dotenv.config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

export const activateAccount = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.body.userId });
  if (!user) {
    res.json({
      success: false,
      message: "User Info is not correct",
    });
  } else {
    const expireDate = new Date();
    console.log(expireDate);
    expireDate.setMonth(expireDate.getMonth() + Number(req.body.amount) / 50);

    console.log(expireDate);

    user.expireDate = expireDate;
    user.isActive = true;
    user.deposit += req.body.amount;
    await user.save();
    res.json({
      success: true,
      token: generateToken(user),
      message: `Successfully activated. Your account's activate date is ${new Date(
        user.expireDate
      ).toDateString()}`,
    });
  }
};

//////////////////////////////////////

export const addOrder = async (req: Request, res: Response) => {
  const { company, address, name, email, link, size } = req.body;

  const payload = {
    company: company,
    address: address,
    name: name,
    email: email,
    link: link,
    size: size,
    active: false,
  };

  const newOrder = new Order(payload);
  await newOrder.save();

  return res.json({
    success: true,
    message: "Successfully Added!",
  });
};

export const getAllOrder = async (req: Request, res: Response) => {
  Order.find().then((models: any) => {
    res.json({ data: models });
  });
};

// Update a listing by ID
export const updateOrder = async (req, res) => {
  console.log(req.params.id);
  try {
    const updatedListing = await Order.findByIdAndUpdate(
      req.params.id,
      { active: true },
      { new: true }
    );

    if (!updatedListing) {
      return res.json({ success: false, message: "Listing not found" });
    }

    sendEmail(updatedListing.company, updatedListing.address, updatedListing.name, updatedListing.link, updatedListing.size, updatedListing.email)

    res.json({ success: true, data: updatedListing });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

const sendEmail = async (
  company: any,
  address: any,
  name: any,
  link: any,
  size: any,
  email: any
) => {
  console.log(company, address, name, link, size, email);
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <title>Completed Your Order</title>
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
  
        h1.title span {
          color: #000;
          font-size: 20px;
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
        <h1 class="title">Complete Your Order</h1>
        <div class="container">
          <div class="row">
            <div class="header">Company:</div>
            <div class="detail">${company}</div>
          </div>
          <div class="row">
            <div class="header">Address:</div>
            <div class="detail">${address}</div>
          </div>
          <div class="row">
            <div class="header">Name:</div>
            <div class="detail">${name}</div>
          </div>
          <div class="row">
            <div class="header">Link:</div>
            <div class="detail">${link}</div>
          </div>
          <div class="row">
            <div class="header">Size:</div>
            <div class="detail">${size}</div>
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
    subject: "Completed Your Order",
    html,
  };

  mailgun.messages().send(data);
};