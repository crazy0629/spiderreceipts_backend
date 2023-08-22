import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = (process.env.SERVER_PORT as string) || 8000;

export const SECRET_KEY =
  (process.env.SECRET_KEY as string) || "spiderreceipts-backend-node-project";
