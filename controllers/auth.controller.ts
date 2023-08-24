import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../service/helper";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

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
  if (user && user.isVerified) {
    return res.json({ success: false, message: "User already exists!" });
  }

  if (user && !user.isVerified) {
    await sendVerificationEmail(user.token, user.email);
    return res.json({
      success: true,
      message: "Please check your inbox and verify your email",
    });
  }

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

  await sendVerificationEmail(token, req.body.email);
  return res.json({
    success: true,
    message: "Please check your inbox and verify your email",
  });
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
  if (user && !user.isVerified) {
    await sendVerificationEmail(user.token, user.email);
    return res.json({
      success: false,
      message: "You need to verify your email",
      verifyIssue: true,
    });
  }

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
