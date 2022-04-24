import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import { Express } from "express";
import errorHandler from "@middlewares/errorHandler";

export function initRoutes(app: Express) {
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/healthcheck", (req, res) => res.send("OK"));
  app.use(errorHandler);
}
