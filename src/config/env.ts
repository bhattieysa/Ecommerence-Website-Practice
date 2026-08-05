import dotenv from "dotenv";
import { cleanEnv, str, num } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
    choices: ["development", "production", "test"],
  }),
  PORT: num({
    default: 5000,
  }),
  DATABASE_URL: str(),  
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
});