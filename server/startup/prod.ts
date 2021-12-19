import { Express } from "express";
import helmet from "helmet";
import compression from "compression";

// Initialise compression and add security headers
export function initProd(app: Express) {
  if (process.env.NODE_ENV === "production") {
    app.use(helmet());
    app.use(compression());
  }
}
