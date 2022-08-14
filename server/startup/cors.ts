import cors from "cors";
import { Express } from "express";

export function initCORS(app: Express) {
  app.use(
    cors({
      origin: [`https://${process.env.HOST}`, `http://${process.env.HOST}`, `${process.env.HOST}`],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      credentials: true, // enable set cookie
    })
  );
}
