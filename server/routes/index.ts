import user from "./user";
import auth from "./auth";
import { Express } from "express";
import error from "../middleware/error";

export function initRoutes(app: Express) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use(error);
}
