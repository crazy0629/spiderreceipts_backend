import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../service/helper";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const mailchimp = require("@mailchimp/mailchimp_marketing");

dotenv.config();

mailchimp.setConfig({
  apiKey: process.env.Mailchimp_apiKey,
  server: process.env.Mailchimp_server,
});

const crypto = require("crypto");
const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

const sendVerificationEmail = async (token: string, email: string) => {
  const link = `${process.env.HOST_URL}/verify?token=${token}&email=${email}`;
  const data = {
    from: "SpyderReceipts <support@spyderreceipts.com>",
    to: email,
    subject: "Email Verification",
    text: `Please click on the following link to verify your email: ${link}`,
  };

  await mailgun.messages().send(data, (error: Error, body) => {
    if (error) {
      return 0;
    }
    return 1;
  });
};

export const resendVeriEmail = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "Error happened while resending verification email",
    });
  }
  const token = crypto.randomBytes(20).toString("hex");
  user.token = token;
  await user.save();
  await sendVerificationEmail(token, user.email);
  return res.json({
    success: true,
    message: "Verification email is successfully resent",
  });
};

export const checkEmailVerified = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
    token: req.body.token,
  });
  if (!user) {
    return res.json({
      success: false,
      message: "Verification Failed, resend your verification email",
    });
  }
  user.isVerified = true;
  await user.save();
  return res.json({
    success: true,
    message: "You have successfully verfied your email.",
  });
};

export const signUp = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: "Please, send your email and password.",
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.json({ success: false, message: "User already exists!" });
  }

  // if (user && user.isVerified) {
  //   return res.json({ success: false, message: "User already exists!" });
  // }

  // if (user && !user.isVerified) {
  //   await sendVerificationEmail(user.token, user.email);
  //   return res.json({
  //     success: true,
  //     message: "Please check your inbox and verify your email",
  //   });
  // }

  let role = 0;

  if (
    req.body.email == process.env.ADMIN_EMAIL1 ||
    req.body.email == process.env.ADMIN_EMAIL2 ||
    req.body.email == process.env.ADMIN_EMAIL3
  ) {
    role = 1;
  }

  const token = crypto.randomBytes(20).toString("hex");

  const payload = {
    email: req.body.email,
    password: req.body.password,
    deposit: 0,
    role,
    isActive: false,
    expireDate: Date.now(),
    isVerified: false,
    token: token,
  };

  const newUser = new User(payload);
  await newUser.save();

  if (req.body.check) {
    await mailchimp.lists.addListMember(process.env.Mailchimp_List_Id, {
      email_address: req.body.email,
      status: "subscribed",
    });
  }
  // await sendVerificationEmail(token, req.body.email);
  return res.json({
    success: true,
    message: "Successfully registered!",
  });
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const result = await mailchimp.lists.addListMember(
      process.env.Mailchimp_List_Id,
      {
        email_address: req.params.email,
        status: "subscribed",
      }
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: "No Input Data!",
      verifyIssue: false,
    });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "User does not exists!",
      verifyIssue: false,
    });
  }
  // if (user && !user.isVerified) {
  //   await sendVerificationEmail(user.token, user.email);
  //   return res.json({
  //     success: false,
  //     message: "You need to verify your email",
  //     verifyIssue: true,
  //   });
  // }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const currentDate = new Date();
    if (user.expireDate < currentDate) {
      user.isActive = false;
      await user.save();
    }
    return res.json({
      success: true,
      message: "Successfully signed!",
      role: user.role,
      token: generateToken(user),
    });
  }

  return res.json({
    success: false,
    message: "The email or password are incorrect!",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  let user = await User.find({ email: req.body.email });

  if (!user) {
    return res.json({
      success: false,
      message: "Your email is not registered.",
    });
  }

  const link = `${process.env.HOST_URL}/reset-password?token=${user[0].token}&email=${user[0].email}`;
  const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet" />
      <title>Verify your email address</title>
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
    
        div.description {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 80px;
        }
    
        a.verify {
          display: block;
          padding: 31px 0;
          text-align: center;
          border-radius: 100px;
          background: #ff6f00;
          text-decoration: none;
          border: none;
          outline: none;
          cursor: pointer;
          max-width: 648px;
          width: 100%;
          margin: auto;
          margin-bottom: 64px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
        }
    
        div.footer {
          text-align: center;
          max-width: 508px;
          width: 100%;
          margin: auto;
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
    
        div.footer p {
          color: #000;
    
          font-size: 16px;
          font-weight: 400;
        }
      </style>
    </head>
    
    <body>
      <div class="root">
        <img src="https://i.ibb.co/9cjWCNz/logo.png" alt="logo" class="logo" />
        <h1 class="title">Verify your email to reset your password</h1>
        <div class="description">
          <p>Hi, Client.</p>
          <p>
            We're sending you this email because you requested a password reset. Click on this link to create a new
            password:
          </p>
        </div>
        <a class="verify" href="${link}" target="_blank">
          Verify Email to reset password
        </a>
        <div class="description">
          <p>
            If you didn't request a password reset, you can ignore this email. Your password will not be changed.
          </p>
          <p>The Support Team</p>
        </div>
        <div class="footer">
          <div class="link">
            <a href="#">Privacy Policy</a> | <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </body>
    </html>`;

  const data = {
    from: "Spyder <support@spyderreceipts.com>",
    to: user[0].email,
    subject: "Verify your email address to reset your password",
    html,
  };

  mailgun.messages().send(data, (error: Error, body) => {
    if (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
    return res.json({
      success: true,
      message:
        "Password Reset Email Sent! Check your inbox (and spam folder) for instructions on resetting your password. If you don't receive an email, contact support.",
    });
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      success: false,
      message: "Your email is not registered.",
    });
  }

  if (user.token !== req.body.token) {
    return res.json({
      success: false,
      message: "Please check gmail again.",
    });
  }

  user.password = req.body.password;
  await user.save();

  return res.json({
    success: true,
    message: "Password reset is successfully done",
  });
};
