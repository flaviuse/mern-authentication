import mongoose from "mongoose";
import winston from "winston";

// Connect to DB from env variable url, create instance
export function initDB() {
  const db = process.env.MONGO_URI || "mongodb://localhost:27017/test";

  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
    .catch((error) => winston.error(error));
}
