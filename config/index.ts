import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = (process.env.SERVER_PORT as string) || 8000;
