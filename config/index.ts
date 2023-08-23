import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = (process.env.SERVER_PORT as string) || 8000;

export const SECRET_KEY =
  (process.env.SECRET_KEY as string) || "spiderreceipts-backend-node-project";

export const Mailgun_API_KEY =
  process.env.SENDGRID_API_KEY ||
  "95675b90fa10658571bdcdd6ae3b3459-73f745ed-16211593";
