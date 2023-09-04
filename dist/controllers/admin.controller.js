"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.removeUser = exports.getAllUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const EmailHistory_1 = __importDefault(require("../models/EmailHistory"));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.find({ role: 0 }).then((models) => {
        EmailHistory_1.default.find().then((models1) => {
            res.json({ user: models, history: models1 });
        });
    });
});
exports.getAllUser = getAllUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findByIdAndDelete(req.body.userId).then((user) => {
        if (!user) {
            res.json({ success: false, message: "Error found while removing user" });
        }
        res.json({ success: true, message: "Successfully deleted" });
    });
});
exports.removeUser = removeUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findOne({
        _id: req.body.userId,
    }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user)
            res.json({ success: false, message: "User does not exit!" });
        user.isActive = req.body.isActive;
        user.expireDate = req.body.expireDate;
        user.save().then(() => {
            res.json({ success: true, message: "Successfully edited" });
        });
    }));
});
exports.editUser = editUser;
