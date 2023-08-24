import { Request, Response } from "express";
import User from "../models/User";

export const getAllUser = async (req: Request, res: Response) => {
  User.find({ role: 0 }).then((models: any) => {
    res.json({ models });
  });
};

export const removeUser = async (req: Request, res: Response) => {
  User.findByIdAndDelete(req.body.userId).then((user: any) => {
    if (!user) {
      res.json({ success: false, message: "Error found while removing user" });
    }
    res.json({ success: true, message: "Successfully deleted" });
  });
};

export const editUser = async (req: Request, res: Response) => {
  User.findOne({
    _id: req.body.userId,
  }).then(async (user: any) => {
    if (!user) res.json({ success: false, message: "User does not exit!" });

    user.isActive = req.body.isActive;
    user.expireDate = req.body.expireDate;
    user.save().then(() => {
      res.json({ success: true, message: "Successfully edited" });
    });
  });
};
