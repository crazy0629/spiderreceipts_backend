"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailgun_API_KEY = exports.SECRET_KEY = exports.SERVER_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SERVER_PORT = process.env.SERVER_PORT || 8000;
exports.SECRET_KEY = process.env.SECRET_KEY || "spiderreceipts-backend-node-project";
exports.Mailgun_API_KEY = process.env.SENDGRID_API_KEY ||
    "95675b90fa10658571bdcdd6ae3b3459-73f745ed-16211593";
