import { model, Schema } from "mongoose";
import { IEmailHistory } from "../service/interfaces";

/**
 * Create a new Schema from mongoose
 */
const MHistorySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    sentDate: { type: Date, rquired: true },
  },
  { timestamps: true }
);

/**
 * IEmailHistory Interface Document class inheritance
 */
export default model<IEmailHistory>("MHistory", MHistorySchema);
