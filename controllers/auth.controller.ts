import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../service/helper";

export const SignUp = async (req: Request, res: Response) => {
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

  let length = 0;
  await User.find()
    .countDocuments()
    .then((data: any) => (length = data));

  const payload = {
    email: req.body.email,
    password: req.body.password,
    index: length + 1,
  };

  const newUser = new User(payload);
  await newUser.save();

  res.json({ success: true, token: generateToken(newUser) });
};
