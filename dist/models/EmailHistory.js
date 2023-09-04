"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Create a new Schema from mongoose
 */
const MHistorySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: { type: String, required: true },
    title: { type: String, required: true },
    sentDate: { type: Date, rquired: true },
}, { timestamps: true });
/**
 * IEmailHistory Interface Document class inheritance
 */
exports.default = (0, mongoose_1.model)("MHistory", MHistorySchema);
