import user from "./user.route";
import auth from "./auth.route";
import { Express } from "express";
import error from "../middleware/error";

export function initRoutes(app: Express) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use(error);
}
