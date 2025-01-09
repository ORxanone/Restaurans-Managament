import { config } from "dotenv";
import * as process from "process";

config();

console.log("Process",process.env.DB_HOST)


config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
  override: true,
});
