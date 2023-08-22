import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../service/helper";
import { IUser } from "../service/interfaces";
import bcrypt from "bcrypt";

// import { Mailgun_API_KEY } from "../config";
// const nodemailer = require("nodemailer");

// const fs = require("fs");
// const mailgun = require("mailgun-js")({
//   apiKey: Mailgun_API_KEY,
//   domain: "bitpool.gg",
// });

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

  let index = 1;

  await User.findOne()
    .sort("-createdAt")
    .exec()
    .then((user: IUser | null) => {
      if (user) {
        index = user.index + 1;
      }
    })
    .catch((err: any) => {
      console.log("An error occurred:", err);
    });

  const payload = {
    email: req.body.email,
    password: req.body.password,
    index: index,
    isActive: false,
    expireDate: Date.now(),
  };

  const newUser = new User(payload);
  await newUser.save();

  res.json({ success: true, message: "Successfully registered!" });
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.json({ success: false, message: "No Input Data!" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ success: false, message: "User does not exists!" });
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
      token: generateToken(user),
    });
  }

  return res.json({
    success: false,
    message: "The email or password are incorrect!",
  });
};

// export const sendEmail = async (req: Request, res: Response) => {
//   const html = fs.readFileSync(`${__dirname}\\hello.html`, {
//     encoding: "utf8",
//     flag: "r",
//   });

// const data = {
//   from: "bitpool@mail.bitsport.gg",
//   to: "milan.jansen0629@gmail.com",
//   subject: "Hello",
//   html: html, // Pass the HTML file content here
// };

// mailgun.messages().send(data, (error: Error, body) => {
//   if (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//     });
//   }
//   console.log(body);
//   return res.json({
//     success: true,
//   });
// });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "milan.jansen0629@gmail.com",
//       pass: "20010629crazy",
//     },
//   });

//   const mailOptions = {
//     from: "milan.jansen0629@gmail.com",
//     to: "kenzo.egghead@gmail.com",
//     subject: "HTML Email Example",
//     html: html,
//   };

//   transporter.sendMail(mailOptions, function (error: any, info: any) {
//     if (error) {
//       console.log(error);
//       return res.json({
//         success: false,
//       });
//     } else {
//       console.log("Email sent: " + info.response);
//       return res.json({
//         success: true,
//       });
//     }
//   });
// };
