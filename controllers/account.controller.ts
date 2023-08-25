import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../service/helper";
import dotenv from "dotenv";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const activateAccount = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.body.userId });
  if (!user) {
    res.json({
      success: false,
      message: "User Info is not correct",
    });
  } else {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + req.body.month * 30);
    user.expireDate = expireDate;
    user.isActive = true;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.money * 100,
        currency: "usd",
        description: "Spiderreceipts account activate",
        payment_method_types: ["card"],
      });
      user.deposit += req.body.money;
      await user.save();
      res.json({
        success: true,
        client_secret: paymentIntent.client_secret,
        token: generateToken(user),
        message: `Successfully activated. Your account's activate date is ${new Date(
          user.expireDate
        ).toDateString()}`,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: "Please enter correct card info" });
    }
  }
};
