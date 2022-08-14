import rateLimit from "express-rate-limit";
import { Express } from "express";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export function initRateLimit(app: Express) {
  app.use(limiter);
}
